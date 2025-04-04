import readline from "readline-sync";
import axios from "axios";
import chalk from "chalk";
import terminalImage from "terminal-image";
import got from "got"; // for image buffer

async function main() {
  console.clear();
  console.log(chalk.bold.green("🌟 GitHub Profile Viewer\n"));

  let userName = readline.question(
    chalk.cyan("👤 Enter your GitHub username: ")
  );
  if (userName.trim() === "") {
    console.log(chalk.red("❌ Please enter a valid username."));
    return;
  }

  try {
    const githubUrl = `https://api.github.com/users/${userName}`;
    const response = await axios.get(githubUrl);
    const userData = response.data;

    // Show avatar image in terminal
    if (userData.avatar_url) {
      const imageBuffer = await got(userData.avatar_url).buffer();
      const image = await terminalImage.buffer(imageBuffer, {
        width: process.stdout.columns - 4, // dynamically use full width with padding
      });
      console.log(image);
    }

    console.log(chalk.bold.green("\n🔍 GitHub User Info:\n"));

    console.log(
      `${chalk.yellow("🧑 Name:")} ${userData.name || "No name provided"}`
    );
    console.log(`${chalk.yellow("💻 Username:")} ${userData.login}`);
    console.log(
      `${chalk.yellow("📧 Email:")} ${userData.email || "No email provided"}`
    );
    console.log(`${chalk.yellow("👥 Followers:")} ${userData.followers}`);
    console.log(`${chalk.yellow("🔁 Following:")} ${userData.following}`);

    if (userData.company)
      console.log(`${chalk.yellow("🏢 Company:")} ${userData.company}`);
    if (userData.blog)
      console.log(`${chalk.yellow("🔗 Blog:")} ${userData.blog}`);
    if (userData.location)
      console.log(`${chalk.yellow("📍 Location:")} ${userData.location}`);
    if (userData.bio) console.log(`${chalk.yellow("📝 Bio:")} ${userData.bio}`);
    if (userData.twitter_username)
      console.log(
        `${chalk.yellow("🐦 Twitter:")} https://twitter.com/${
          userData.twitter_username
        }`
      );

    console.log(chalk.gray("\n✨ Made with ❤️ by Suhail\n"));
  } catch (error) {
    if (error.response?.status === 404) {
      console.log(chalk.red("❌ User not found. Please check the username."));
    } else {
      console.log(chalk.red("⚠️ Error occurred:"), error.message);
    }
  }
}

main();
