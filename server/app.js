import readline from "readline-sync";
import axios from "axios";
import terminalImage from "terminal-image";
import got from "got";
import chalk from "chalk";

async function main() {
  try {
    console.clear();

    console.log(chalk.bold.green("🌟 GitHub Profile Viewer\n\n"));
    let userName = readline.question(
      chalk.bold.cyan("👤  Enter your gitHub userName : ")
    );
    if (!userName) {
      return console.log(chalk.bold.red(`❌ Enter your Valid user name`));
    }
    console.clear();
    console.log(chalk.bold.green("🌟 GitHub Profile Viewer\n\n"));
    let gitURL = `https://api.github.com/users/${userName}`;

    let response = await axios.get(gitURL);
    let userData = response.data;

    // console.log(userData);

    if (userData.avatar_url) {
      const imageBuffer = await got(userData.avatar_url).buffer();
      const image = await terminalImage.buffer(imageBuffer, {
        width: process.stdout.columns - 4, // dynamically use full width with padding
      });
      console.log(image);
    }

    let login = userData.login;
    let name = userData.name;
    let location = userData.location;
    let email = userData.email;
    let bio = userData.bio;
    let followers = userData.followers;
    let following = userData.following;

    console.log(chalk.bold.green("\n\n🔍 GitHub User Info:\n"));

    console.log(`${chalk.yellow.bold("\n\n💻 Username           :")}${login}`);
    console.log(`${chalk.yellow.bold("🧑 Name               :")}${name}`);
    console.log(
      `${chalk.bold.yellow("📧 Email              :")}${userData.email}`
    );
    console.log(`${chalk.bold.yellow("📍 Location           :")}${location}`);
    console.log(`${chalk.bold.yellow("👥 Followers          :")}${followers}`);
    console.log(`${chalk.bold.yellow("🔁 Following          :")}${following}`);
    console.log(
      `${chalk.bold.yellow("📝 Bio                :")}${userData.bio}`
    );

    console.log(`${chalk.bold.grey("\n\nMade with  ❤️   By Shamil\n\n")}`);
    //     console.log(`${chalk.bold.yellow}User Name           :${gituserName}`);
    //     console.log(`${chalk.bold.yellow}Name                :${name}`);
    //     console.log(`${chalk.bold.yellow}location            :${location}`);
    //     console.log(`${chalk.bold.yellow}bio                 :${bio}`);
    //     console.log(`${chalk.bold.yellow}followers           :${followers}`);
    //     console.log(`${chalk.bold.yellow}following           :${following}`);
  } catch (error) {
    console.log("hello");
    console.log(error);
  }
}

main();
