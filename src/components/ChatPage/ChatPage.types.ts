type Message = {
  id: string;
  username: string;
  message: string;
  createdAt: number;
};

type Messages = Message[];

export type { Messages };
