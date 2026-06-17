import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { message, history = [] } = await req.json();

    const safeHistory = history
      .filter((m) => m?.role && m?.content)
      .map((m) => ({
        role: m.role,
        content: m.content,
      }));

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.2,
      max_tokens: 500,
      messages: [
        {
          role: "system",
          content: `
أنت مساعد قانوني متخصص فقط في القوانين المصرية.

القواعد:
- أجب فقط عن الأسئلة المتعلقة بالقانون المصري.
- قدم معلومات قانونية عامة او استشارة قانونية.
- قدم معلومات عن الاوراق او المستندات الرسمية او قانونية.
- إذا كان السؤال خارج نطاق القانون المصري، لا تجب عليه.
- رد دائمًا بالعبارة التالية فقط:

"عذرًا، أنا متخصص في القانون المصري فقط ولا أستطيع الإجابة على الأسئلة خارج هذا المجال."

- لا تقدم معلومات عامة أو علمية أو تقنية أو طبية أو رياضية أو ترفيهية.
- لا تخترع مواد قانونية أو أحكام قضائية.

`,
        },
        ...safeHistory,
        {
          role: "user",
          content: message,
        },
      ],
    });

    return Response.json({
      success: true,
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("OPENAI ERROR FULL:", error);

    return Response.json(
      {
        success: false,
        reply: error?.message || "Server error",
      },
      { status: 500 },
    );
  }
}
