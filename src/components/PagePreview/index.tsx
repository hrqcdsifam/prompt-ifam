// src/components/PagePreview.tsx
import React from "react";
import style from "./index.module.css";

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

interface Props {
  pages: Page[];
  config: {
    width: number;
    height: number;
  };
  removePage: (index: number) => void;
}

const PagePreview: React.FC<Props> = ({ pages, removePage }) => {
  return (
    <>
      <div className={style.page_preview}>
        <h3>Preview das Páginas</h3>
        {pages.map((page, index) => (
          <div className={style.preview_options}>
            <div key={index} className={style.page}>
              <h4>{page.title}</h4>
              <div className={style.button}>
                {page.buttons.map((value, i) => (
                  <button disabled key={i}>
                    {value}
                  </button>
                ))}
              </div>
              <div className={style.textfield}>
                {page.textFields.map((value, i) => (
                  <input key={i} value={value} disabled />
                ))}
              </div>
              <div className={style.textarea}>
                {page.textAreas.map((value, i) => (
                  <textarea key={i} value={value} disabled />
                ))}
              </div>
              <div className={style.checkbox}>
                {page.checkboxs.map((value, i) => (
                  <div key={value + i}>
                    <input key={value + i} type="checkbox" value={i} disabled />
                    <label> {i}</label>
                  </div>
                ))}
              </div>
              <div className={style.label}>
                {page.labels.map((value, i) => (
                  <label key={i}>{value}</label>
                ))}
              </div>
              <div className={style.images}>
                {page.images.map((_, i) => (
                  <img key={i} src="." />
                ))}
              </div>
            </div>
            <button
              className={style.trash_button}
              onClick={() => removePage(index)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default PagePreview;
