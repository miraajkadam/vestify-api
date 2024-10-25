/**
 * Validates if a given URL is a valid Twitter (X) link.
 *
 * @param {string} url - The URL to validate.
 *
 * @returns {boolean} True if the URL is a valid Twitter (X) link, false otherwise.
 *
 * @example
 * isValidXLink("https://x.com/username"); // returns true
 * isValidXLink("https://x.com/username/status/1234567890123456789"); // returns true
 * isValidXLink("https://www.x.com/username/status/1234567890123456789"); // returns true
 * isValidXLink("https://example.com/user/username"); // returns false
 */
export const isValidXLink = (url: string): boolean => {
  const regex =
    /^(https?:\/\/)?(www\.)?(x\.com\/[a-zA-Z0-9_]{1,15}|[a-zA-Z0-9_]{1,15}\/status\/\d{1,19})$/

  return regex.test(url)
}

/**
 * Validates if a given URL is a valid Twitter link.
 *
 * @param {string} url - The URL to validate.
 *
 * @returns {boolean} True if the URL is a valid Twitter link, false otherwise.
 *
 * @example
 * isValidTwitterLink("https://twitter.com/username"); // returns true
 * isValidTwitterLink("https://twitter.com/username/status/1234567890123456789"); // returns true
 * isValidTwitterLink("https://www.twitter.com/username/status/1234567890123456789"); // returns true
 * isValidTwitterLink("https://example.com/user/username"); // returns false
 */
export const isValidTwitterLink = (url: string): boolean => {
  const regex =
    /^(https?:\/\/)?(www\.)?(twitter\.com\/[a-zA-Z0-9_]{1,15}|[a-zA-Z0-9_]{1,15}\/status\/\d{1,19})$/

  return regex.test(url)
}

/**
 * Validates if a given URL is a valid Instagram link.
 *
 * @param {string} url - The URL to validate.
 * @returns {boolean} True if the URL is a valid Instagram link, false otherwise.
 *
 * @example
 * isValidInstagramLink("https://instagram.com/username"); // returns true
 * isValidInstagramLink("https://www.instagram.com/username/"); // returns true
 * isValidInstagramLink("https://instagram.com/p/ABC123xyz/"); // returns true
 * isValidInstagramLink("https://example.com/user/username"); // returns false
 */
export const isValidInstagramLink = (url: string): boolean => {
  const regex = /^(https?:\/\/)?(www\.)?(instagram\.com\/[a-zA-Z0-9._]+|p\/[a-zA-Z0-9._-]+)\/?$/

  return regex.test(url)
}

/**
 * Validates if a given URL is a valid Discord link.
 *
 * @param {string} url - The URL to validate.
 * @returns {boolean} True if the URL is a valid Discord link, false otherwise.
 *
 * @example
 * isValidDiscordLink("https://discord.gg/abc123"); // returns true
 * isValidDiscordLink("https://discord.gg/project_invite"); // returns true
 * isValidDiscordLink("https://discord.com/invite/xyz789"); // returns true
 * isValidDiscordLink("https://example.com/user/username"); // returns false
 */
export const isValidDiscordLink = (url: string) => {
  const regex =
    /^(https?:\/\/)?(www\.)?(discord\.gg|discord.com\/(invite|channels|users))\/[\w-]{3,}$/

  return regex.test(url)
}

/**
 * Validates if a given URL is a valid Telegram link.
 *
 * @param {string} url - The URL to validate.
 * @returns {boolean} True if the URL is a valid Telegram link, false otherwise.
 *
 * @example
 * isValidTelegramLink("https://t.me/username"); // returns true
 * isValidTelegramLink("https://telegram.me/joinchat/ABC123"); // returns true
 * isValidTelegramLink("https://t.me/joinchat/ABC123"); // returns true
 * isValidTelegramLink("https://example.com/user/username"); // returns false
 */
export const isValidTelegramLink = (url: string): boolean => {
  const regex = /^(https?:\/\/)?(www\.)?(t\.me|telegram\.me)\/[a-zA-Z0-9_]+$/

  return regex.test(url)
}

/**
 * Validates if a given URL is a valid Medium link.
 *
 * @param {string} url - The URL to validate.
 * @returns {boolean} True if the URL is a valid Medium link, false otherwise.
 *
 * @example
 * isValidMediumLink("https://medium.com/@username"); // returns true
 * isValidMediumLink("https://medium.com/@username/article-title"); // returns true
 * isValidMediumLink("https://medium.com/article-title"); // returns true
 * isValidMediumLink("https://medium.com/p/some-article"); // returns true
 * isValidMediumLink("https://example.com/user/username"); // returns false
 */
export const isValidMediumLink = (url: string): boolean => {
  const regex =
    /^(https?:\/\/)?(www\.)?(medium\.com\/(@[a-zA-Z0-9._]+(\/[a-zA-Z0-9-]+)?|[a-zA-Z0-9-]+(\?source=.+)?)\/?)$/

  return regex.test(url)
}

/**
 * Validates if a given URL is a valid YouTube link.
 *
 * @param {string} url - The URL to validate.
 * @returns {boolean} True if the URL is a valid YouTube link, false otherwise.
 *
 * @example
 * isValidYouTubeLink("https://www.youtube.com/watch?v=dQw4w9WgXcQ"); // returns true
 * isValidYouTubeLink("https://youtu.be/dQw4w9WgXcQ"); // returns true
 * isValidYouTubeLink("https://www.youtube.com/embed/dQw4w9WgXcQ"); // returns true
 * isValidYouTubeLink("https://example.com/user/username"); // returns false
 */
export const isValidYouTubeLink = (url: string): boolean => {
  const regex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/|.+\?v=|.+\/)?|youtu\.be\/)[a-zA-Z0-9_-]{11}(\S+)?$/

  return regex.test(url)
}

/**
 * Validates if a given URL is a valid LinkedIn profile link.
 *
 * @param {string} url - The URL to validate.
 * @returns {boolean} True if the URL is a valid LinkedIn profile link, false otherwise.
 *
 * @example
 * isValidLinkedinLink("https://www.linkedin.com/in/jane-doe/"); // returns true
 * isValidLinkedinLink("https://linkedin.com/company/openai/"); // returns true
 * isValidLinkedinLink("https://linkedin.com/"); // returns false
 * isValidLinkedinLink("https://example.com/user/username"); // returns false
 */
export const isValidLinkedinLink = (url: string): boolean => {
  const regex =
    /((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/

  return regex.test(url)
}
