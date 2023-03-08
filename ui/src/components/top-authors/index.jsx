import React from "react";
import data from "../../../data/huawei_france.json";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function TopAuthors() {
  let authors = data.results.reduce(function (acc, publication) {
    publication.authorships.forEach((el) => {
      let authorName = el.author.display_name;
      if (!acc[authorName]) {
        acc[authorName] = 0;
      }
      acc[authorName]++;
    });
    return acc;
  }, {});

  let topAuthors = Object.entries(authors)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([author, count]) => ({ name: author, y: count }));

  console.log(topAuthors);

  const options = {
    chart: { type: "column" },
    credits: { enabled: false },
    legend: { enabled: false },
    series: [
      {
        data: topAuthors.map((item) => item.y),
        name: "Nombre de publications",
      },
    ],
    title: { text: "Top 10 des auteurs avec le plus de publications" },
    xAxis: { categories: topAuthors.map((item) => item.name) }, // Affiche tous les noms des 10 premiers auteurs
    yAxis: { title: { text: "Nombre de publications" } },
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default TopAuthors;
