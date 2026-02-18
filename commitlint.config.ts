import config from "@commitlint/config-conventional";
import type { ParserPreset, UserConfig } from "@commitlint/types";
import createPreset from "conventional-changelog-conventionalcommits";
import { merge } from "lodash-es";

// A helper function to create the custom emoji parser preset.
async function createEmojiParser(): Promise<ParserPreset> {
  // Generates the regex from the emojis defined in the conventional config.
  const emojiRegexPart = Object.values(config.prompt.questions.type.enum)
    .map((value) => value.emoji.trim())
    .join("|");

  const parserOpts = {
    // This regular expression validates commit headers with an emoji.
    breakingHeaderPattern: new RegExp(
      `^(?:${emojiRegexPart})\\s+(\\w*)(?:\\((.*)\\))?!:\\s+(.*)$`,
    ),
    headerPattern: new RegExp(
      `^(?:${emojiRegexPart})\\s+(\\w*)(?:\\((.*)\\))?!?:\\s+(.*)$`,
    ),
  };

  const emojiParser = merge({}, await createPreset(), {
    conventionalChangelog: { parserOpts },
    parserOpts,
    recommendedBumpOpts: { parserOpts },
  });

  return emojiParser;
}

const emojiParser = await createEmojiParser();

export default {
  extends: ["@commitlint/config-conventional"],
  parserPreset: emojiParser,
  prompt: {
    questions: {
      type: {
        enum: {
          // Customize emojis and add the extra space for better alignment.
          build: { emoji: "🛠️ " },
          chore: { emoji: "♻️ " },
          ci: { emoji: "⚙️ " },
          revert: { emoji: "🗑️ " },
        },
        // This setting includes the emoji in the final commit header.
        headerWithEmoji: true,
      },
    },
  },
} satisfies UserConfig;
