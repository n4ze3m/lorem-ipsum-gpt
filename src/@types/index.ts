export interface DataChunk {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    delta: {
      role?: string;
      content?: string;
    };
    finish_reason: string | null;
  }>;
}

export interface ChatCompletionRequest {
  ReqBody: {
    stream: boolean;
    messages: {
      role: string;
      content: string;
    }[];
  };
}
