import { Activity, StatusDiscipline, TypeAverageDiscipline } from "@prisma/client";

export class Discipline {
  id: number;
  nameTeacher: string;
  status: StatusDiscipline;
  typeAv: TypeAverageDiscipline;
  noteMin: number;
  name: string;
  userId: number;
  activity?: Activity[];
  dateEnd: Date;
}
