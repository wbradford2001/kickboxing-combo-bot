import { Polly } from './aws-config';
import { SynthesizeSpeechCommand, SynthesizeSpeechCommandInput } from "@aws-sdk/client-polly";

const getBlobFromStream = (stream: ReadableStream): Promise<Blob> => {
  return new Response(stream).blob();
};

export const getSpeech = async (text: string, rate: string = 'medium'): Promise<string> => {
  const ssmlText = `<speak><prosody rate="${rate}">${text}</prosody></speak>`;

  const params: SynthesizeSpeechCommandInput = {
    Text: ssmlText,
    OutputFormat: 'mp3',
    VoiceId: 'Matthew', // Choose your preferred voice
    TextType: 'ssml',
  };

  try {
    const command = new SynthesizeSpeechCommand(params);
    const data = await Polly.send(command);

    if (data.AudioStream) {
      let audioBlob: Blob;
      
      if (data.AudioStream instanceof ReadableStream) {
        audioBlob = await getBlobFromStream(data.AudioStream);
      } else if (data.AudioStream instanceof Blob) {
        audioBlob = data.AudioStream;
      } else if (data.AudioStream instanceof ArrayBuffer) {
        audioBlob = new Blob([data.AudioStream], { type: 'audio/mpeg' });
      } else {
        throw new Error('Unsupported AudioStream type');
      }

      const audioUrl = URL.createObjectURL(audioBlob);
      return audioUrl;
    } else {
      throw new Error('Unable to synthesize speech');
    }
  } catch (err: any) {
    throw new Error(`Error synthesizing speech: ${err.message}`);
  }
};
