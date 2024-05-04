type ColumnProps = {
  [x: string]: any;
  title: string;
  key?: string;
  dataIndex: string;
  show?: boolean;
  render?: (value: any, record: any, index: number) => React.ReactNode;
  type?: string;
  align?: "left" | "center" | "right";
  width?: number | string;
  children?: any;
  style?: any;
};
export type {ColumnProps};
