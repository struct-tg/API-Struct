import { Activity, TypeAverageDiscipline } from "@prisma/client";

export class Discipline {
  id: number;
  nameTeacher: string;
  typeAv: TypeAverageDiscipline;
  noteMin: number;
  name: string;
  userId: number;
  activity?: Activity[];
  dateEnd: Date;
  note: number;
}
