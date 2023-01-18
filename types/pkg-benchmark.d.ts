interface TrialEstimate {
  time: number,
  memory: number,
  allocs: number
}

interface BenchmarkGroup {
  [key: string]: TrialEstimate | BenchmarkGroup
}

interface G0 {
  [key: string]: TrialEstimate
}

interface G1 {
  [key: string]: G0
}

interface G2 {
  [key: string]: G1
}

interface BenchmarkConfig {
  id: string,
  juliacmd: any,
  env: Record<string, string>
}

interface BenchmarkResults {
  name: string,
  benchmarkconfig: BenchmarkConfig,
  benchmarkgroup: BenchmarkGroup,
  vinfo: string,
  commit: string,
  julia_commit: string,
  date: string
}

interface BenchmarkData {
  [key: string]: string
}
