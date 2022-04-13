// Type definitions for TOAST UI Image Editor v1.0.18
// TypeScript Version: 3.2.2
// TypeScript Version: 3.2.2
declare module '@vumuio/vumu-image-editor-module' {
  import { fabric } from 'fabric';
  import Graphics from '@/graphics';
  export interface IThemeConfig {
    'common.bi.image'?: string;
    'common.bisize.width'?: string;
    'common.bisize.height'?: string;
    'common.backgroundImage'?: string;
    'common.backgroundColor'?: string;
    'common.border'?: string;
    'header.backgroundImage'?: string;
    'header.backgroundColor'?: string;
    'header.border'?: string;
    'loadButton.backgroundColor'?: string;
    'loadButton.border'?: string;
    'loadButton.color'?: string;
    'loadButton.fontFamily'?: string;
    'loadButton.fontSize'?: string;
    'downloadButton.backgroundColor'?: string;
    'downloadButton.border'?: string;
    'downloadButton.color'?: string;
    'downloadButton.fontFamily'?: string;
    'downloadButton.fontSize'?: string;
    'menu.normalIcon.path'?: string;
    'menu.normalIcon.color'?: string;
    'menu.normalIcon.name'?: string;
    'menu.activeIcon.path'?: string;
    'menu.activeIcon.color'?: string;
    'menu.activeIcon.name'?: string;
    'menu.disabledIcon.color'?: string;
    'menu.iconSize.height'?: string;
    'menu.hoverIcon.color'?: string;
    'menu.iconSize.width'?: string;
    'submenu.backgroundColor'?: string;
    'submenu.partition.color'?: string;
    'submenu.normalIcon.path'?: string;
    'submenu.normalIcon.name'?: string;
    'submenu.normalIcon.color'?: string;
    'submenu.activeIcon.path'?: string;
    'submenu.activeIcon.name'?: string;
    'submenu.activeIcon.color'?: string;
    'submenu.iconSize.width'?: string;
    'submenu.iconSize.height'?: string;
    'submenu.normalLabel.color'?: string;
    'submenu.normalLabel.fontWeight'?: string;
    'submenu.activeLabel.color'?: string;
    'submenu.activeLabel.fontWeight'?: string;
    'checkbox.border'?: string;
    'checkbox.backgroundColor'?: string;
    'range.pointer.color'?: string;
    'range.bar.color'?: string;
    'range.subbar.color'?: string;
    'range.value.color'?: string;
    'range.value.fontWeight'?: string;
    'range.value.fontSize'?: string;
    'range.value.border'?: string;
    'range.value.backgroundColor'?: string;
    'range.disabledPointer.color'?: string;
    'range.disabledBar.color'?: string;
    'range.disabledSubbar.color'?: string;
    'range.title.color'?: string;
    'range.title.fontWeight'?: string;
    'colorpicker.button.border'?: string;
    'colorpicker.title.color'?: string;
  }
  export interface IIconInfo {
    [propName: string]: string;
  }

  export interface IIconOptions {
    fill?: string;
    left?: number;
    top?: number;
  }

  export interface IShapeOptions {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    width?: number;
    height?: number;
    rx?: number;
    ry?: number;
    left?: number;
    top?: number;
    isRegular?: boolean;
  }

  export interface IGenerateTextOptions {
    styles?: ITextStyleConfig;
    position?: {
      x: number;
      y: number;
    };
  }

  export interface ITextStyleConfig {
    fill?: string;
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: string;
    fontWeight?: string;
    textAlign?: string;
    textDecoration?: string;
  }

  export interface IRectConfig {
    left: number;
    top: number;
    width: number;
    height: number;
  }

  export interface ICanvasSize {
    width: number;
    height: number;
  }

  export interface IBrushOptions {
    width: number;
    color: string;
  }

  export interface IPositionConfig {
    x: number;
    y: number;
    originX: string;
    originY: string;
  }

  export interface IToDataURLOptions {
    format?: string;
    quality?: number;
    multiplier?: number;
    left?: number;
    top?: number;
    width?: number;
    height?: number;
  }

  export interface IGraphicObjectProps {
    id?: number;
    type?: string;
    text?: string;
    left?: string | number;
    top?: string | number;
    width?: string | number;
    height?: string | number;
    fill?: string;
    stroke?: string;
    strokeWidth?: string | number;
    fontFamily?: string;
    fontSize?: number;
    fontStyle?: string;
    fontWeight?: string;
    textAlign?: string;
    textDecoration?: string;
    opacity?: number;
    [propName: string]: number | string | boolean | undefined;
  }

  export interface IIncludeUIOptions {
    loadImage?: {
      path: string;
      name: string;
    };
    theme?: IThemeConfig;
    menu?: string[];
    initMenu?: string;
    uiSize?: {
      width: string;
      height: string;
    };
    menuBarPosition?: string;
    usageStatistics?: boolean;
  }

  export interface ISelectionStyleConfig {
    cornerStyle?: string;
    cornerSize?: number;
    cornerColor?: string;
    cornerStrokeColor?: string;
    transparentCorners?: boolean;
    lineWidth?: number;
    borderColor?: string;
    rotatingPointOffset?: number;
    borderScaleFactor?: number;
  }

  export interface IObjectProps {
    // icon, shape
    fill: string;
    height: number;
    id: number;
    left: number;
    opacity: number;
    stroke: string | null;
    strokeWidth: number | null;
    top: number;
    type: string;
    width: number;
  }

  export interface ITextObjectProps extends IObjectProps {
    fontFamily: string;
    fontSize: string;
    fontStyle: string;
    text: string;
    textAlign: string;
    textDecoration: string;
  }

  export interface IFilterResolveObject {
    type: string;
    action: string;
  }

  export interface ICropResolveObject {
    oldWidth: number;
    oldHeight: number;
    newWidth: number;
    newHeight: number;
  }

  export interface IFlipXYResolveObject {
    flipX: boolean;
    flipY: boolean;
    angle: AngleType;
  }

  export interface IOptions {
    includeUI?: IIncludeUIOptions;
    cssMaxWidth?: number;
    cssMaxHeight?: number;
    usageStatistics?: boolean;
    selectionStyle?: ISelectionStyleConfig;
  }

  export interface IUIDimension {
    height?: string;
    width?: string;
  }

  export interface IImageDimension {
    oldHeight?: number;
    oldWidth?: number;
    newHeight?: number;
    newWidth?: number;
  }

  export interface IEditorSize {
    uiSize?: IUIDimension;
    imageSize?: IImageDimension;
  }

  export interface UI {
    resizeEditor(dimension: IEditorSize): Promise<void>;
  }

  type AngleType = number;
  namespace tuiImageEditor {
    class ImageEditor {
      constructor(wrapper: string | Element, options: IOptions);
      public ui: UI;

      public addIcon(type: string, options?: IIconOptions): Promise<IObjectProps>;
      public addImageObject(imgUrl: string): Promise<void>;
      public addShape(type: string, options?: IShapeOptions): Promise<IObjectProps>;
      public addText(text: string, options?: IGenerateTextOptions): Promise<ITextObjectProps>;
      public applyFilter(
        type: string,
        options?: {
          maskObjId: number;
        },
        isSilent?: boolean
      ): Promise<IFilterResolveObject>;
      public changeCursor(cursorType: string): void;
      public changeIconColor(id: number, color: string): Promise<void>;
      public changeSelectableAll(selectable: boolean): void;
      public changeShape(id: number, options?: IShapeOptions, isSilent?: boolean): Promise<void>;
      public changeText(id: number, text?: string): Promise<void>;
      public changeTextStyle(
        id: number,
        styleObj: ITextStyleConfig,
        isSilent?: boolean
      ): Promise<void>;
      public clearObjects(): Promise<void>;
      public clearRedoStack(): void;
      public clearUndoStack(): void;
      public crop(rect: IRectConfig): Promise<ICropResolveObject>;
      public deactivateAll(): void;
      public destroy(): void;
      public discardSelection(): void;
      public flipX(): Promise<IFlipXYResolveObject>;
      public flipY(): Promise<IFlipXYResolveObject>;
      public getCanvasSize(): ICanvasSize;
      public getCanvasInstance(): fabric.Canvas;
      public appendUnderCursor(id: number, text: string): void;
      public getCropzoneRect(): IRectConfig;
      public getDrawingMode(): string;
      public getImageName(): string;
      public getObjectPosition(id: number, originX: string, originY: string): ICanvasSize;
      public getObjectProperties(
        id: number,
        keys: string | string[] | IGraphicObjectProps
      ): IGraphicObjectProps;
      public hasFilter(type: string): boolean;
      public isEmptyRedoStack(): boolean;
      public isEmptyUndoStack(): boolean;
      public loadImageFromFile(imgFile: File, imageName?: string): Promise<ICropResolveObject>;
      public loadImageFromURL(url: string, imageName?: string): Promise<ICropResolveObject>;
      public redo(): Promise<any>;
      public registerIcons(infos: IIconInfo): void;
      public removeActiveObject(): void;
      public removeFilter(type?: string): Promise<IFilterResolveObject>;
      public removeObject(id: number): Promise<void>;
      public resetFlip(): Promise<IFlipXYResolveObject>;
      public resizeCanvasDimension(dimension: ICanvasSize): Promise<void>;
      public resize(dimension: ICanvasSize): Promise<void>;
      public rotate(angle: AngleType, isSilent?: boolean): Promise<AngleType>;
      public setAngle(angle: AngleType, isSilent?: boolean): Promise<AngleType>;
      public setBrush(option: IBrushOptions): void;
      public setCropzoneRect(mode?: number): void;
      public setDrawingShape(type: string, options?: IShapeOptions): void;
      public setObjectPosition(id: number, posInfo?: IPositionConfig): Promise<void>;
      public setObjectProperties(id: number, keyValue?: IGraphicObjectProps): Promise<void>;
      public setObjectPropertiesQuietly(id: number, keyValue?: IGraphicObjectProps): Promise<void>;
      public setDefaultSelectionStyle(style: ISelectionStyleConfig): void;
      public startDrawingMode(mode: string, option?: { width?: number; color?: string }): boolean;
      public stopDrawingMode(): void;
      public toDataURL(options?: IToDataURLOptions): string;
      public undo(): Promise<any>;
      public on(eventName: string, handler: (...args: any[]) => void): void;
      public off(eventName?: string, handler?: (...args: any[]) => void): void;
      public bringForward(): void;
      public sendBackwards(): void;
      public sendToBack(): void;
      public bringToFront(): void;
      public dupplicateObject(): void;
     }
  }

  export default tuiImageEditor.ImageEditor;
}
