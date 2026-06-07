const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  white: '\x1b[37m',
  dim: '\x1b[2m'
};

export const printBanner = async () => {
  // Clear the terminal screen
  console.clear();

  const nextora = [
    "  _   _  ______  __  __  _______   ____    _____            ",
    " | \\ | ||  ____| \\ \\/ / |__   __| / __ \\  |  __ \\     /\\    ",
    " |  \\| || |__     \\  /     | |   | |  | | | |__) |   /  \\   ",
    " | . ` ||  __|    /  \\     | |   | |  | | |  _  /   / /\\ \\  ",
    " | |\\  || |____  / /\ \\    | |   | |__| | | | \\ \\  / ____ \\ ",
    " |_| \\_||______|/_/  \\_\\   |_|    \\____/  |_|  \\_\\/_/    \\_\\"
  ];

  const studio = [
    "   _____  _______  _    _  _____   _____   ____  ",
    "  / ____||__   __|| |  | ||  __ \\ |_   _| / __ \\ ",
    " | (___     | |   | |  | || |  | |  | |  | |  | |",
    "  \\___ \\    | |   | |  | || |  | |  | |  | |  | |",
    "  ____) |   | |   | |__| || |__| | _| |_ | |__| |",
    " |_____/    |_|    \\____/ |_____/ |_____| \\____/ "
  ];

  // Print NEXTORA in Cyan
  for (const line of nextora) {
    console.log(`${colors.cyan}${colors.bright}${line}${colors.reset}`);
    await sleep(30);
  }

  // Print STUDIO in Magenta
  for (const line of studio) {
    console.log(`${colors.magenta}${colors.bright}${line}${colors.reset}`);
    await sleep(30);
  }

  console.log(`${colors.dim}====================================================================${colors.reset}`);
  await sleep(50);

  // Typewriter effect function
  const typeLine = async (label, text, color = colors.white) => {
    // We construct the prefix and the typed content separately so the typing effect occurs smoothly on the value
    const prefix = `  ${colors.bright}[${label}]${colors.reset} `;
    process.stdout.write(prefix);
    
    const coloredText = `${color}${text}${colors.reset}`;
    // Since we have ANSI escape characters in the text, we don't want to type them character-by-character
    // because that prints raw escape sequences onto the screen. Instead, we type the plain text and apply color,
    // or type character-by-character by writing the color sequence, the char, then reset.
    for (let i = 0; i < text.length; i++) {
      process.stdout.write(`${color}${text[i]}${colors.reset}`);
      await sleep(12);
    }
    process.stdout.write('\n');
  };

  await typeLine("System", "Initializing Nextora Studio API Server...", colors.cyan);
  await typeLine("Developer", "Crafted with ❤️ by Salahuddin", colors.green);
  await typeLine("Environment", `${process.env.NODE_ENV || 'development'} mode`, colors.yellow);
  await typeLine("Port", `Listening on http://localhost:${process.env.PORT || 5000}`, colors.magenta);
  console.log(`${colors.dim}====================================================================${colors.reset}`);
  console.log("");
};
