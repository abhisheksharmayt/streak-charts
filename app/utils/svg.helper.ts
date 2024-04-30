import * as d3 from "d3";
import { Canvas } from "canvas";
import { JSDOM } from "jsdom";
import { LeetcodeStreakData } from "../types/Leetcode";
import {
  convertToMidnight,
  dateWithoutTime,
  getUnixTimestampsForYear,
} from "./date.helper";
import { getColorCode } from "./common.helper";

export const createSvg = (data: LeetcodeStreakData, year: string) => {
  if (!data) return "<svg></svg>";

  const virtualDOM = new JSDOM("<html><body></body></html>", {
    pretendToBeVisual: true,
  });
  global.document = virtualDOM.window.document;

  const streakData = JSON.parse(
    data.matchedUser.userCalendar.submissionCalendar
  );
  const streakTimeStamps = Object.keys(streakData).map((e) =>
    dateWithoutTime(+e)
  );
  const timeStamps = getUnixTimestampsForYear(+year);
  console.log(timeStamps);
  console.log("--------");
  console.log(streakTimeStamps);
  console.log("--------");
  console.log(timeStamps.length);
  console.log("--------");

  const width = "auto";
  const height = 400;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;

  const svg = d3
    .select(document.body)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("xmlns", "http://www.w3.org/2000/svg");

  svg
    .append("g")
    .selectAll("rect")
    .data(timeStamps)
    .enter()
    .append("rect")
    .attr("width", "12px")
    .attr("height", "12px")
    .attr("rx", "4")
    .attr("ry", "4")
    .attr("data-unixTime", function (d) {
      return d;
    })
    .attr("x", function (d, i) {
      return 5 + 5 * (i / 30) + Math.floor(i / 7) * 13;
    })
    .attr("y", function (d, i) {
      return 5 + (i % 7) * 13;
    })
    .attr("fill", function (d, i) {
      // console.log("*",dateWithoutTime(+d).toString(),"*");
      return streakTimeStamps.includes(dateWithoutTime(+d))
        ? getColorCode(streakData[d])
        : +d === 0
        ? "#FFFFFF00"
        : "#0000000a";
    });

  // const x = d3
  //   .scaleUtc()
  //   .domain([new Date("2023-01-01"), new Date("2024-01-01")])
  //   .range([marginLeft, width - marginRight]);

  // // Declare the y (vertical position) scale.
  // const y = d3
  //   .scaleLinear()
  //   .domain([0, 100])
  //   .range([height - marginBottom, marginTop]);

  // // Create the SVG container.
  // const svg = d3
  //   .select(document.body)
  //   .append("svg")
  //   .attr("width", width)
  //   .attr("height", height)
  //   .attr("xmlns", "http://www.w3.org/2000/svg");

  // // Add the x-axis.
  // svg
  //   .append("g")
  //   .attr("transform", `translate(0,${height - marginBottom})`)
  //   .call(d3.axisBottom(x));

  // // Add the y-axis.
  // svg
  //   .append("g")
  //   .attr("transform", `translate(${marginLeft},0)`)
  //   .call(d3.axisLeft(y));

  // Get the SVG markup as a string
  const svgMarkup = svg.node()?.outerHTML;

  // Clean up the virtual DOM
  virtualDOM.window.close();

  return svgMarkup;
};
