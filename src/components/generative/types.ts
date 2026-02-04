export interface Track {
  name: string
  genre: 'electronic' | 'hiphop'
  tempo: number
  energy: number
  danceability: number
  vocals: number
}

export interface FeatureStats {
  avg: number
  min: number
  max: number
}

export interface GenreStats {
  tempo: FeatureStats
  energy: FeatureStats
  danceability: FeatureStats
  vocals: FeatureStats
}

export interface Distribution {
  values: number[]
  min: number
  max: number
  bins: { [key: number]: number }
}
