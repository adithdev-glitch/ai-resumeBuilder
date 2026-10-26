import { geminiClient, GEMINI_MODEL } from '../config/gemini.js';

const SYSTEM_INSTRUCTION = `You are a quiet, expert resume editor assisting a professional job applicant.
Rules you must strictly follow at all times:
1. Keep all claims truthful. Never invent employers, dates, metrics, percentages, dollar amounts, or skills that the user did not provide.
2. Begin every bullet point with a decisive, active past-tense verb (e.g., Engineered, Spearheaded, Redesigned, Streamlined).
3. Be concise and eliminate fluff, filler words, and buzzwords (e.g., avoid "synergy", "supercharge", "rockstar").
4. Maintain a clean, professional human tone.
5. Return JSON ONLY. Do not include markdown codeblocks or conversational preamble.`;

export async function improveBulletService({ bullet, role }) {
  if (!bullet || typeof bullet !== 'string') {
    throw new Error('A valid bullet point text is required.');
  }

  // If no Gemini API key configured, provide a polished human rule-based rewrite fallback
  if (!geminiClient) {
    const trimmed = bullet.trim();
    const actionVerbs = ['Engineered', 'Architected', 'Spearheaded', 'Optimized', 'Streamlined'];
    const chosenVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
    const cleanRemainder = trimmed.replace(/^(I\s+|we\s+|responsible for\s+|helped with\s+|worked on\s+)+/gi, '');
    const capitalized = cleanRemainder.charAt(0).toLowerCase() + cleanRemainder.slice(1);
    return {
      suggested: `${chosenVerb} ${capitalized}`,
    };
  }

  const prompt = `Role context: ${role || 'Professional'}
Original bullet point: "${bullet}"

Rewrite this bullet point to be punchy, active, and impact-driven while remaining 100% faithful to the facts. Stay under 35 words.
Return JSON ONLY:
{"suggested": "rewritten bullet text"}`;

  try {
    const response = await geminiClient.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text || '';
    const cleanJson = rawText.replace(/```json\n?|```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    if (!parsed || typeof parsed.suggested !== 'string' || !parsed.suggested.trim()) {
      throw new Error('Model returned an unexpected schema.');
    }

    return { suggested: parsed.suggested.trim() };
  } catch (error) {
    console.error('[Gemini Service Error - improveBullet]:', error.message);
    throw new Error("Couldn't reach the suggestion service. Your text is unchanged.");
  }
}

export async function generateSummaryService({ experience, jobTitle }) {
  if (!experience || !Array.isArray(experience)) {
    throw new Error('Experience history is required to generate a summary.');
  }

  if (!geminiClient) {
    const title = jobTitle || 'Experienced Professional';
    const companies = experience.map((e) => e.company).filter(Boolean).slice(0, 2).join(' and ');
    return {
      summary: `${title} with a track record across ${companies || 'high-growth teams'}. Proven capability executing end-to-end projects with strict quality and performance standards. Dedicated to delivering measurable user and business value.`,
    };
  }

  const expSummary = experience
    .map((e) => `${e.role || 'Role'} at ${e.company || 'Company'}: ${(e.bullets || []).join(' ')}`)
    .join('\n');

  const prompt = `Target Professional Title: ${jobTitle || 'Professional'}
User Experience:
${expSummary}

Write a 2-3 sentence executive summary (45–70 words) summarizing these capabilities. Keep it truthful to the experience provided.
Return JSON ONLY:
{"summary": "2-3 sentence summary text"}`;

  try {
    const response = await geminiClient.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text || '';
    const cleanJson = rawText.replace(/```json\n?|```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    if (!parsed || typeof parsed.summary !== 'string' || !parsed.summary.trim()) {
      throw new Error('Model returned an unexpected schema.');
    }

    return { summary: parsed.summary.trim() };
  } catch (error) {
    console.error('[Gemini Service Error - generateSummary]:', error.message);
    throw new Error("Couldn't reach the suggestion service. Your text is unchanged.");
  }
}

export async function tailorExperienceService({ experience, jobDescription, targetRole }) {
  if (!experience || !Array.isArray(experience)) {
    throw new Error('Valid experience entries are required.');
  }
  if (!jobDescription || typeof jobDescription !== 'string') {
    throw new Error('A job description is required to tailor.');
  }

  if (!geminiClient) {
    // Return gently formatted experience
    return {
      suggestedExperience: experience,
    };
  }

  const prompt = `Target Role: ${targetRole || 'Target Role'}
Job Description Requirements:
${jobDescription.slice(0, 1500)}

User Experience:
${JSON.stringify(experience, null, 2)}

Re-align the bullet points of this experience to highlight relevant competencies matching the job description without inventing employers, dates, or untrue metrics.
Return JSON ONLY matching schema:
{
  "suggestedExperience": [
    {
      "id": "string",
      "role": "string",
      "company": "string",
      "location": "string",
      "startDate": "string",
      "endDate": "string",
      "current": true,
      "bullets": ["string"]
    }
  ]
}`;

  try {
    const response = await geminiClient.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text || '';
    const cleanJson = rawText.replace(/```json\n?|```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    if (!parsed || !Array.isArray(parsed.suggestedExperience)) {
      throw new Error('Model returned an unexpected schema.');
    }

    return { suggestedExperience: parsed.suggestedExperience };
  } catch (error) {
    console.error('[Gemini Service Error - tailorExperience]:', error.message);
    throw new Error("Couldn't reach the suggestion service. Your text is unchanged.");
  }
}
