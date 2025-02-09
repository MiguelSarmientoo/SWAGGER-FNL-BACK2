import { ElevenLabsClient } from "elevenlabs";
import { Polly } from 'aws-sdk';

class SpeechTextController {
  private apiKey: string;
  private client: ElevenLabsClient;
  private polly: Polly;

  constructor() {
    this.apiKey = process.env.ELEVENLABS_API_KEY || "";
    if (!this.apiKey) {
      throw new Error("Falta ELEVENLABS_API_KEY en las variables de entorno");
    }
    this.client = new ElevenLabsClient({ apiKey: this.apiKey });

    this.polly = new Polly({
      region: 'us-east-1', 
    });
  }

  async generateSpeech1(req: any, res: any) {
    try {
      const { text, voiceId } = req.query;

      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "El parámetro 'text' es obligatorio y debe ser un string." });
      }
      
      /**

 
      Voces femeninas:
      - Bella
      - Elli
      - Rachel
      - Dorothy
      - Freya
      Voces masculinas:
      - Adam
      - Antoni
      - Domi
      - Josh
      - Thomas
      */
      // Generar audio como ReadableStream
      const audioStream = await this.client.generate({
        voice: (voiceId as string) ?? "Rachel",
        model_id: "eleven_multilingual_v1",
        text: text as string,
      });

      // Convertir ReadableStream a Buffer
      const chunks: Buffer[] = [];
      for await (const chunk of audioStream) {
        chunks.push(chunk);
      }

      const audioBuffer = Buffer.concat(chunks);

      // Configurar headers y enviar audio
      res.set({
        "Content-Type": "audio/mpeg",
        "Content-Disposition": "inline; filename=generated_audio.mp3",
      });

      res.send(audioBuffer);
    } catch (error) {
      console.error("Error al generar el audio con ElevenLabs:", error);
      res.status(500).json({ error: "Error al generar el audio" });
    }
  }

  async generateSpeech(req: any, res: any) {
    try {
      const { text, voiceId } = req.query;

      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "El parámetro 'text' es obligatorio y debe ser un string." });
      }
      console.log(voiceId);
      // Establecer la voz predeterminada si no se pasa una
      const voice = "Lucia"; // Puedes cambiar la voz predeterminada aquí

      // Generar el audio con Polly
      const params: Polly.Types.SynthesizeSpeechInput = {
        Text: text, // El texto que quieres convertir a habla
        OutputFormat: "mp3", // El formato de salida
        VoiceId: voice, // La voz seleccionada
        Engine: "neural",
      };

      const data = await this.polly.synthesizeSpeech(params).promise();

      if (data.AudioStream instanceof Buffer) {
        // Configurar los headers para la respuesta
        res.set({
          "Content-Type": "audio/mpeg",
          "Content-Disposition": "inline; filename=generated_audio.mp3",
        });

        // Enviar el audio generado
        res.send(data.AudioStream);
      } else {
        throw new Error("Error al generar el audio");
      }
    } catch (error) {
      console.error("Error al generar el audio con AWS Polly:", error);
      res.status(500).json({ error: "Error al generar el audio" });
    }
  }
}

export default new SpeechTextController(); // Exportar una única instancia
