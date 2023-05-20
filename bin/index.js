#!/usr/bin/env node
import inquirer from "inquirer";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";

const questions = [
  {
    type: "input",
    name: "projectName",
    message: "It's a Typescript, Node js, template 🔥 \n. Please enter your new project's name.",
    default: "ts-node-project",
  },
];

function main(path) {
  try {
    console.log("Downloading files...");
    const gitCloneCommand = `git clone --depth 1 https://github.com/Reza-tm/ts-nodeJs-boilerplate ${path}`;
    execSync(gitCloneCommand);
    process.chdir(path);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

inquirer.prompt(questions).then((answers) => {
  const { projectName } = answers;
  if (!projectName) {
    throw new Error("Enter project name 😖");
  }

  const currentPath = process.cwd();
  const projectPath = path.join(currentPath, String(projectName));

  try {
    fs.mkdirSync(projectPath);
  } catch (err) {
    if (err.code === "EEXIST") {
      console.log(
        `❌ The file '${projectName}' already exist in the current directory, please give it another name. ❌`
      );
    } else {
      console.log("❌ ", err, " ❌");
    }
    process.exit(1);
  }

  main(projectPath);
});
