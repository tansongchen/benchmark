interface TrialEstimate {
  time: number;
  memory: number;
  allocs: number;
  params: Record<string, number>;
}

interface BenchmarkGroup {
  [key: string]: TrialEstimate | BenchmarkGroup;
}

interface G0 {
  [key: string]: TrialEstimate;
}

interface G1 {
  [key: string]: G0;
}

interface G2 {
  [key: string]: G1;
}

interface BenchmarkContext {
  datetime: string;
  commit: string;
  branch: string;
  tag: string;
}

interface BenchmarkUpload {
  config: Record<string, unknown>;
  context: BenchmarkContext;
  suite: BenchmarkGroup;
}

interface BenchmarkData {
  [key: string]: BenchmarkUpload;
}
