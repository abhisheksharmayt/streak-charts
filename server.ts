import express, { Request, Response } from "express";
import fs from "fs";
import dotenv from "dotenv";
import { request, gql, GraphQLClient } from "graphql-request";
import { createSvg } from "./app/utils/svg.helper";
import { LeetcodeStreakData } from "./app/types/Leetcode";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.get("/api/:username", async (req: Request, res: Response) => {
  const { username } = req.params;
  const { year } = req.query;
  const graphQLClient = new GraphQLClient("https://leetcode.com/graphql", {
    referrer: "https://leetcode.com/abhisheksharmayt/",
  });
  const query = gql`
    ${fs.readFileSync("app/graphql/streak-charts.graphql", "utf8")}
  `;
  const variables = {
    username,
    year,
  };
  const results = await graphQLClient.request(query, variables);
  const chart = createSvg(results as LeetcodeStreakData, year as string);
  // && (
  //   `<svg
  //     xmlns="http://www.w3.org/2000/svg"
  //     x="0px"
  //     y="0px"
  //     width="48"
  //     height="48"
  //     viewBox="0 0 48 48"
  //   >
  //     <path fill="#ffd600" d="M6,42V6h36v36H6z"></path>
  //     <path
  //       fill="#000001"
  //       d="M29.538 32.947c.692 1.124 1.444 2.201 3.037 2.201 1.338 0 2.04-.665 2.04-1.585 0-1.101-.726-1.492-2.198-2.133l-.807-.344c-2.329-.988-3.878-2.226-3.878-4.841 0-2.41 1.845-4.244 4.728-4.244 2.053 0 3.528.711 4.592 2.573l-2.514 1.607c-.553-.988-1.151-1.377-2.078-1.377-.946 0-1.545.597-1.545 1.377 0 .964.6 1.354 1.985 1.951l.807.344C36.452 29.645 38 30.839 38 33.523 38 36.415 35.716 38 32.65 38c-2.999 0-4.702-1.505-5.65-3.368L29.538 32.947zM17.952 33.029c.506.906 1.275 1.603 2.381 1.603 1.058 0 1.667-.418 1.667-2.043V22h3.333v11.101c0 3.367-1.953 4.899-4.805 4.899-2.577 0-4.437-1.746-5.195-3.368L17.952 33.029z"
  //     ></path>
  //   </svg>`
  // );
  // console.log(results);
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(chart);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
