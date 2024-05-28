"use client";
import { useEffect, useState, useRef } from "react";
import InsightBar from "./InsightBar";
import { Editor } from "@tinymce/tinymce-react";
import { getGeneralInfo } from "@/services/professional_information/generalService";
import { findCVById } from "@/services/cvService";

const CV = ({ params }: { params: { cv_id: string } }) => {
  const [cvBodyData, setCvBodyData] = useState<string>("");
  const editorRef = useRef<any>(null);
  const [autosaveStatus, setAutosaveStatus] = useState<string>("");

  useEffect(() => {
    const fetchCV = async () => {
      if (params.cv_id) {
        const cvData = await findCVById(params.cv_id);
        if (cvData) {
          setCvBodyData(cvData.content)
          console.log("CV Data:", cvData);
        } else {
          console.log("No CV found with ID:", params.cv_id);
        }
      }
    };

    fetchCV();
  }, [params.cv_id]);
  // useEffect(() => {
  //   const autosaveInterval = setInterval(() => {
  //     if (editorRef.current) {
  //       const content = editorRef.current.getContent();
  //       saveContent(content);
  //       setAutosaveStatus("Autosaving...");
  //     }
  //   }, 3000);

  //   return () => {
  //     clearInterval(autosaveInterval);
  //   };
  // }, []);

  const saveContent = async (content: string) => {
    console.log("Autosaving content:", content);

    try {
      const response = await fetch("/api/saveCv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cvContent: content,
          selectedPosition: "Data Engineer",
        }),
      });

      if (response.ok) {
        console.log("CV saved successfully!");
        setAutosaveStatus("Autosaved");
      } else {
        console.error("Failed to save CV:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving CV:", error);
    }
  };

  const handleEditorChange = (content: string) => {
    setAutosaveStatus("");
  };

  return (
    <div className="w-full h-full flex flex-row overflow-hidden bg-bg">
      <div className="w-[calc(100%_-_400px)] flex justify-center overflow-y-scroll">
        {cvBodyData ? (
          <>
            <Editor
              apiKey="hi9g24m32os96uo8nv3i44ziv3peqf6fhojyma85rfda1tgc"
              init={{
                branding: false,
                resize: false,
                plugins:
                  "anchor autolink charmap codesample emoticons link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown autosave",
                toolbar:
                  "undo redo | fontfamily fontsize | bold italic underline strikethrough | link image media table | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                tinycomments_mode: "embedded",
                tinycomments_author: "Author name",
                mergetags_list: [
                  { value: "First.Name", title: "First Name" },
                  { value: "Email", title: "Email" },
                ],
                ai_request: (request, respondWith) =>
                  respondWith.string(() =>
                    Promise.reject("See docs to implement AI Assistant")
                  ),
                autosave_interval: 10000, // Autosave interval in milliseconds
                autosave_prefix: "cv-autosave", // Prefix for autosave key
              }}
              initialValue={cvBodyData}
              onInit={(evt, editor) => (editorRef.current = editor)}
              /*               onChange={handleEditorChange}
               */
            />
            {autosaveStatus && <div>{autosaveStatus}</div>}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="absolute right-0 z-10">
        <InsightBar />
      </div>
    </div>
  );
};

export default CV;
