import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from './chat.gateway';
import { INestApplication } from "@nestjs/common";
import { Socket, io } from "socket.io-client";

async function createNestApp(...gateways: any): Promise<INestApplication> {
  const testingModule = await Test.createTestingModule({
    providers: gateways,
  }).compile();
  return testingModule.createNestApplication();
}

describe('ChatGateway', () => {
  let gateway: ChatGateway;
  let app: INestApplication;
  let ioClient: Socket;

  beforeAll(async () => {
    app = await createNestApp(ChatGateway);
    gateway = app.get<ChatGateway>(ChatGateway);
    ioClient = io("http://localhost:3000", {
      autoConnect: false,
      transports: ["websocket", "polling"],
    });

    app.listen(3000);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
