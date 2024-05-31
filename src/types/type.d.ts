type TType = "todo" | "progress" | "done";

interface IDate {
  id: number;
  title: string;
  type: TType;
}
