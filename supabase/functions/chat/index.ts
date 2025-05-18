import OpenAI from 'npm:openai@4.24.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a helpful booking assistant for BookingHub, a platform for booking meeting rooms, conference halls, and workspaces.
          Your role is to help users find and book appropriate spaces based on their needs.
          Be concise, friendly, and always try to understand the specific requirements like:
          - Type of space needed (meeting room, conference hall, etc.)
          - Number of people
          - Preferred date and time
          - Location preferences
          - Special requirements (AV equipment, catering, etc.)
          
          Current available spaces include:
          1. Business Meeting Room (up to 10 people, projector included)
          2. Conference Hall (up to 100 people, full AV setup)
          3. Private Office (1-4 people, basic furnishing)
          4. Creative Studio (well-lit, perfect for photoshoots)
          5. Training Room (up to 30 people, flexible seating)
          6. Hot Desk (individual workspace in shared area)`
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    return new Response(
      JSON.stringify({
        response: completion.choices[0].message.content,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});