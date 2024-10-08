import {
  Chart,
  LineController,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Colors,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";

import ChartWrapper from "./ChartWrapper";
import TagList from "./TagList";

Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
);
Chart.register(Colors, Legend, Title, Tooltip);

interface Props {
  breadcrumb: string;
  tags: Set<string>;
  contexts: BenchmarkContext[];
  series: TrialEstimate[];
  toggleTag: (t: string) => void;
  selectedTags: Set<string>;
}

// Leave some space between the maximum value and the top of plot, while still have nice numbers
const determineYMax = (times: number[]) => {
  const m = Math.max(...times);
  const someOrderOf10 = Math.pow(10, Math.floor(Math.log10(m)));
  return Math.ceil((m * 1.2) / someOrderOf10) * someOrderOf10;
};

export default function TimeSeriesChart({
  breadcrumb,
  tags,
  contexts,
  series,
  toggleTag,
  selectedTags,
}: Props) {
  const slug = breadcrumb;
  const commits = contexts.map((x) => x.commit.slice(0, 7));
  const timesInNs = series.map((x) => x.time);
  const timesInUs = timesInNs.map((x) => x / 1000);
  return (
    <ChartWrapper>
      <Line
        data={{
          labels: commits,
          datasets: [{ data: timesInUs, label: "Time" }],
        }}
        options={{
          scales: {
            x: { title: { text: "Commit", display: true } },
            y: {
              title: { text: "Time / μs", display: true },
              min: 0,
              max: determineYMax(timesInUs),
            },
          },
          plugins: {
            title: { text: slug, display: true },
            tooltip: {
              callbacks: {
                footer: (items) => {
                  const context = contexts[items[0].dataIndex];
                  return [
                    `Date: ${new Date(context.datetime).toLocaleDateString()}`,
                  ];
                },
              },
            },
          },
        }}
      />
      <TagList
        tags={Array.from(tags).sort()}
        toggleTag={toggleTag}
        selectedTags={selectedTags}
      />
    </ChartWrapper>
  );
}
