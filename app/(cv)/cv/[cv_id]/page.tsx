"use client";

// Package imports
import { useEffect, useState } from "react";

// Component imports
import InsightBar from "./InsightBar";
import { Editor } from "@tinymce/tinymce-react";

const CV = () => {
  const [cvBodyData, setCvBodyData] = useState<string>("");
  useEffect(() => {
    const callApi = async () => {
      const selectedPosition = "Software Engineer";
      // Call the api endpoint that calls the llm
      const response = await fetch("/api/createCv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedPosition }),
      });
      const jsonData = await response.json();
      const message = jsonData.results;
      setCvBodyData(message);
    };
    callApi();
  }, []);

  return (
    <div className="w-full h-full flex flex-row overflow-hidden bg-bg">
      <div className="w-[calc(100%_-_400px)] flex justify-center overflow-y-scroll">
        {cvBodyData ? (
          <Editor
            apiKey="hi9g24m32os96uo8nv3i44ziv3peqf6fhojyma85rfda1tgc"
            init={{
              branding: false,
              resize: false,
              plugins:
                "anchor autolink charmap codesample emoticons link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
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
            }}
            initialValue={cvBodyData}
          />
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
