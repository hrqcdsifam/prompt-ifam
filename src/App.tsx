// src/App.tsx
import { useState } from "react";
import InputPanel from "./components/InputPanel";
import PagePreview from "./components/PagePreview";
import { generateJson } from "./services/generate_manifest";
import "./App.css";

interface Page {
  title: string;
  buttons: string[];
  buttonPos?: {
    x: number;
    y: number;
  };
  textFields: string[];
  textfieldsPos?: {
    x: number;
    y: number;
  };
  labels: string[];
  labelsPos?: {
    x: number;
    y: number;
  };
  checkboxs: string[];
  checkboxsPos?: {
    x: number;
    y: number;
  };
  textAreas: string[];
  textAreasPos?: {
    x: number;
    y: number;
  };
  images: string[];
  imagePos?: {
    x: number;
    y: number;
  };
}

function App() {
  const [pages, setPages] = useState<Page[]>([]);
  const [model, setModel] = useState<string>("");
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [orientation, setOrientation] = useState<string>("Portrait");

  const printManifest = () => {
    generateJson({
      header: {
        model,
        height,
        width,
        orientation,
      },
      body: pages,
    });
  };

  const handleAddPage = (page: Page) => {
    setPages([...pages, page]);
  };

  const removePage = (index: number) => {
    setPages((state) => state.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="app-container">
        <InputPanel
          addPage={handleAddPage}
          config={{
            model,
            height,
            width,
            orientation,
            setModel: (value) => setModel(value),
            setWidht: (value) => setWidth(value),
            setHeight: (value) => setHeight(value),
            setOrientation: (value) => setOrientation(value),
          }}
        />
        <PagePreview
          pages={pages}
          config={{
            height,
            width,
          }}
          removePage={removePage}
        />
      </div>
      <button
        className="button"
        disabled={pages.length == 0}
        onClick={printManifest}
      >
        Gerar Manifest
      </button>
    </>
  );
}

export default App;
