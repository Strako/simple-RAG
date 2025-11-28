import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Groq } from 'groq-sdk';
import { envs } from 'src/config';
import { getMessage } from './utils';

const groq = new Groq({ apiKey: envs.groq.apiKey });
const logger = new Logger();

export async function getGroqChatCompletion(similaritySearchResult: string[], querie: string) {
  const context = similaritySearchResult.join(',');
  const meesage = getMessage(context, querie);
  logger.debug(meesage);
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: meesage,
        },
      ],
      model: 'openai/gpt-oss-20b',
    });
    return chatCompletion;
  } catch (e: unknown) {
    if (e instanceof Error) {
      logger.error(e.message, e.stack);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    } else {
      logger.error('Unknown error', e);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
