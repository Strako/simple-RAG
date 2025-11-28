import { Injectable } from '@nestjs/common';
import { SendQueryResponseDto } from './dto/send-query-response.dto';
import { SendQueryDto } from './dto/send-query.dto';
import { similaritySearch } from './common/utils';
import { getGroqChatCompletion } from './common/gro-utils';

@Injectable()
export class QueriesService {
  async sendQuerie(sendQueryDto: SendQueryDto): Promise<SendQueryResponseDto> {
    const { querie, namespace } = sendQueryDto;
    const similaritySearchResult = await similaritySearch(querie, namespace);
    const chatCompletion = await getGroqChatCompletion(similaritySearchResult, querie);
    const response = chatCompletion?.choices?.[0]?.message?.content;

    return new SendQueryResponseDto({ success: Boolean(response), completition: response });
  }
}
