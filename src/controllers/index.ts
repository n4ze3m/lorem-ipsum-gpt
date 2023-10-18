import { Request, Response } from "express";
import { generateLoremIpsumGPT } from "../utils/gpt";
import { DataChunk } from "../@types";

export const getAllModelsController = (req: Request, res: Response) => {
  try {
    const data = {
      type: "object",
      data: [
        {
          id: "lorem-ipsum-gpt",
          object: "model",
        },
      ],
    };

    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({
      error: {
        message: "Server error",
        type: "internal_server_error",
      },
    });
  }
};

export const chatCompletionController = (req: Request, res: Response) => {
  try {
    const { stream } = req.body;
    const messages = req.body.messages;
    if (!messages || messages.length === 0) {
      return res.status(400).json({
        error: {
          message: "[] is too short - 'messages'",
          type: "invalid_request_error",
          param: null,
          code: null,
        },
      });
    }
    if (stream) {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const message = messages[messages.length - 1]["content"];
      const generateedResponse = generateLoremIpsumGPT(message.length);
      const chunks = generateedResponse.split(" ");
      const baseData: DataChunk = {
        id: "chatcmpl-xxx",
        object: "chat.completion.chunk",
        created: new Date().getTime(),
        model: "lorem-ipsum-gpt",
        choices: [
          {
            index: 0,
            delta: {},
            finish_reason: null,
          },
        ],
      };

      let index = 0;

      function streamChunk() {
        if (index < chunks.length) {
          const dataToSend = { ...baseData };
          dataToSend.choices[0].delta.content = chunks[index] + " ";
          res.write(`data: ${JSON.stringify(dataToSend)}\n\n`);
          index++;
          setTimeout(streamChunk, 1000);
        } else {
          res.write("data: [DONE]\n\n");
          res.end();
        }
      }

      return streamChunk();
    } else {
      const message = messages[messages.length - 1]["content"];
      const generateedResponse = generateLoremIpsumGPT(message.length);

      return res.status(200).json({
        id: "chatcmpl-xxx",
        object: "chat.completion",
        created: new Date().getTime(),
        model: "lorem-ipsum-gpt",
        choices: [
          {
            index: 0,
            message: {
              role: "assistant",
              content: generateedResponse,
            },
            finish_reason: "stop",
          },
        ],
      });
    }
  } catch (e) {
    return res.status(500).json({
      error: {
        message: "Server error",
        type: "internal_server_error",
      },
    });
  }
};
