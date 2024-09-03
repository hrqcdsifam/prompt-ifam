interface TextArea {
  typeComponent: "TextArea2";
  id: string;
  value: string;
  placeholder: string;
  backgroundColor: string;
  color: string;
  fontSize: number;
}

interface TextField {
  typeComponent: "TextField";
  id: string;
  value: string;
  placeholder: string;
  posX: number;
  posY: number;
}

interface Label {
  typeComponent: "TextArea";
  id: string;
  value: string;
  posX: number;
  posY: number;
}

interface CheckBox {
  typeComponent: "CheckBox";
  id: string;
  label: string;
  posX: number;
  posY: number;
}

interface Bar {
  typeComponent: "Bar";
  id: string;
  value: string;
  posX: number;
  posY: number;
}

interface Image {
  typeComponent: "Image";
  id: string;
  value: string;
  posX: number;
  posY: number;
}

interface ButtonWithLabel {
  typeComponent: "ButtonWithLabel";
  id: string;
  title: string;
  color: "white";
  backgroundColor: "blue";
  fontSize: number;
  posX: number;
  posY: number;
}

interface Panel {
  typeComponent: "Panel";
  id: string;
  value: string;
  color: "black";
  backgroundColor: "white";
  fontSize: number;
  posX: number;
  posY: number;
}

type ScreenChild =
  | TextArea
  | TextField
  | Label
  | CheckBox
  | Bar
  | Image
  | ButtonWithLabel
  | Panel;

interface Screen {
  typeComponent: "Screen";
  id: string;
  backgroundColor: "white";
  height: number;
  width: number;
  orientation: "landscape" | "portrait";
  childs: ScreenChild[];
}

interface Manifest {
  projectName: string;
  author: string;
  ihm: {
    model: string;
    orientation: string;
    width: number;
    height: number;
  };
  screens: Screen[];
}

export interface Header {
  model: string;
  height: number;
  width: number;
  orientation: string;
}

export interface Body {
  title: string;
  buttons: string[];
  textFields: string[];
  labels: string[];
  checkboxs: string[];
  textAreas: string[];
  images: string[];
}

export interface Props {
  header: Header;
  body?: Body[];
}

export function GenerateManifest({
  header: { model, height, orientation, width },
  body,
}: Props): Manifest {
  const generateScreen = (body: Body): Screen => {
    const childs: ScreenChild[] = [];

    body.buttons.forEach((value, index) => {
      childs.push(generateScreenChild(index, "ButtonWithLabel", value));
    });

    body.textFields.forEach((value, index) => {
      childs.push(generateScreenChild(index, "TextField", value));
    });

    body.labels.forEach((value, index) => {
      childs.push(generateScreenChild(index, "TextArea", value));
    });

    body.checkboxs.forEach((value, index) => {
      childs.push(generateScreenChild(index, "CheckBox", value));
    });

    body.textAreas.forEach((value, index) => {
      childs.push(generateScreenChild(index, "TextArea2", value));
    });

    body.images.forEach((value, index) => {
      childs.push(generateScreenChild(index, "Image", value));
    });

    return {
      typeComponent: "Screen",
      id: body.title,
      backgroundColor: "white",
      height: 0,
      width: 0,
      orientation: "portrait",
      childs,
    };
  };

  const generateScreenChild = (
    position: number,
    type: string,
    value: string
  ): ScreenChild => {
    switch (type) {
      case "TextArea2":
        return {
          typeComponent: "TextArea2",
          id: `${type}${position + 1}`,
          value,
          placeholder: `${type}${position + 1}`,
          backgroundColor: "white",
          color: "black",
          fontSize: 10,
        };
      case "TextField":
        return {
          typeComponent: "TextField",
          id: `${type}${position + 1}`,
          value: `${type}${position + 1}`,
          posX: 0,
          posY: 0,
          placeholder: `${type}${position + 1}`,
        };
      case "TextArea":
        return {
          typeComponent: "TextArea",
          id: `${type}${position + 1}`,
          value: `${type}${position + 1}`,
          posX: 0,
          posY: 0,
        };
      case "CheckBox":
        return {
          typeComponent: "CheckBox",
          id: `${type}${position + 1}`,
          label: `${type}${position + 1}`,
          posX: 0,
          posY: 0,
        };
      case "Image":
        return {
          typeComponent: "Image",
          id: `${type}${position + 1}`,
          value: `${type}${position + 1}`,
          posX: 0,
          posY: 0,
        };
      case "ButtonWithLabel":
        return {
          typeComponent: "ButtonWithLabel",
          id: `${type}${position + 1}`,
          title: `${type}${position + 1}`,
          color: "white",
          backgroundColor: "blue",
          fontSize: 10,
          posX: 0,
          posY: 0,
        };
      default:
        throw new Error("Invalid type");
    }
  };

  return {
    projectName: "Projeto",
    author: "Modelagem",
    ihm: {
      model,
      width,
      height,
      orientation: orientation.toLocaleLowerCase(),
    },
    screens: body ? body.map(generateScreen) : [],
  };
}

export function generateJson(props: Props) {
  const data = GenerateManifest(props);
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
