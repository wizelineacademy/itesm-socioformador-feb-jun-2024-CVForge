"use client";
import { useEffect, useState, useRef } from "react";
import InsightBar from "./InsightBar";
import { Editor } from "@tinymce/tinymce-react";
import { getGeneralInfo } from "@/services/professional_information/generalService";
import { findCVById } from "@/services/cvService";
import GalleryLoading from "@/app/components/loading";
import { setCurrentTab } from "@/contexts/cv/sidebar/currentTab";
import { useDispatch } from "react-redux";

const CV = ({ params }: { params: { cv_id: string } }) => {
  const [cvBodyData, setCvBodyData] = useState<string>("");
  const editorRef = useRef<any>(null);
  const [autosaveStatus, setAutosaveStatus] = useState<string>("");
  const dispatch = useDispatch()
  dispatch(setCurrentTab("cv_gallery"))

  useEffect(() => {
    const fetchCV = async () => {
      if (params.cv_id) {
        const cvData = await findCVById(params.cv_id);
        if (cvData) {
          setCvBodyData(cvData.content);
          console.log("CV Data:", cvData);
        } else {
          console.log("No CV found with ID:", params.cv_id);
        }
      }
    };

    fetchCV();
  }, [params.cv_id]);

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
    <div className="flex h-screen overflow-y-scroll justify-center bg-transparent">
        <div className="flex flex-row">
          {cvBodyData ? (
            <div className="flex flex-row ">
              <div className="mr-[390px] mt-2 h-auto border ">
                <Editor
                  apiKey="hi9g24m32os96uo8nv3i44ziv3peqf6fhojyma85rfda1tgc"
                  init={{
                    branding: false,
                    resize: false,
                    height: 800, // Set the height of the editor
                    min_height: 200, 
                    width: 700,
                    plugins:
                      "anchor autolink charmap codesample emoticons link lists media searchreplace table visualblocks wordcount linkcheckerx",
                    toolbar:
                      "undo redo | fontfamily fontsize | bold italic underline strikethrough | link image media table | spellcheckdialog | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                  }}
                  initialValue={cvBodyData.replace(/h3/g, 'p')}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                />
                {autosaveStatus && <div>{autosaveStatus}</div>}
              </div>
              <div className="absolute right-0">
                <InsightBar />
              </div>
            </div>
          ) : (
            <div className="absolute w-screen h-screen top-0 left-0 bg-primarygray bg-opacity-50 flex justify-center items-center z-20">
              <GalleryLoading />
            </div>
          )}
        </div>
      </div>
  );
};

export default CV;
/**
 * return (
    <div className="w-full h-screen flex flex-row overflow-hidden bg-bg">
      <div className="mx-auto flex justify-center overflow-y-scroll">
        {cvBodyData ? (
          <div className="flex flex-row">
            <div className="mx-auto">
              <Editor
                apiKey="hi9g24m32os96uo8nv3i44ziv3peqf6fhojyma85rfda1tgc"
                init={{
                  branding: false,
                  resize: false,
                  plugins:
                    "anchor autolink charmap codesample emoticons link lists media searchreplace table visualblocks wordcount linkcheckerx",
                  toolbar:
                    "undo redo | fontfamily fontsize | bold italic underline strikethrough | link image media table | spellcheckdialog | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                }}
                initialValue={cvBodyData}
                onInit={(evt, editor) => (editorRef.current = editor)}
              />
              {autosaveStatus && <div>{autosaveStatus}</div>}
            </div>
            <div className="ml-auto">
              <InsightBar />
            </div>
          </div>
        ) : (
          <div className="absolute w-screen h-screen top-0 left-0 bg-primarygray bg-opacity-50 flex justify-center items-center z-20">
            <GalleryLoading />
          </div>
        )}
      </div>
    </div>
  );
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 "use client";
import { useEffect, useState, useRef } from "react";
import InsightBar from "./InsightBar";
import { Editor } from "@tinymce/tinymce-react";
import { getGeneralInfo } from "@/services/professional_information/generalService";
import { findCVById } from "@/services/cvService";
import GalleryLoading from "@/app/components/loading";

const CV = ({ params }: { params: { cv_id: string } }) => {
  const [cvBodyData, setCvBodyData] = useState<string>("");
  const editorRef = useRef<any>(null);
  const [autosaveStatus, setAutosaveStatus] = useState<string>("");

  useEffect(() => {
    const fetchCV = async () => {
      if (params.cv_id) {
        const cvData = await findCVById(params.cv_id);
        if (cvData) {
          setCvBodyData(cvData.content);
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
                  "anchor autolink charmap codesample emoticons link lists media searchreplace table visualblocks wordcount linkcheckerx",
                toolbar:
                  "undo redo | fontfamily fontsize | bold italic underline strikethrough | link image media table | spellcheckdialog | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
              }}
              initialValue={cvBodyData}
              onInit={(evt, editor) => (editorRef.current = editor)}
                />
                {autosaveStatus && <div>{autosaveStatus}</div>}
              </>
            ) : (
              <div className="absolute w-screen h-screen top-0 left-0 bg-primarygray bg-opacity-50 flex justify-center items-center z-20">
                <GalleryLoading />
              </div>
            )}
          </div>
          <div className="absolute right-0 z-10">
            <InsightBar />
          </div>
        </div>
      );
    };
    
    export default CV;
    
 */