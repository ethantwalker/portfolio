// Generated by https://quicktype.io

export interface JSONRoot {
    samples: Sample[];
}

export interface Sample {
    _id:          string;
    title:        string;
    description:  string;
    technologies: string[];
    link:         string;
    thumb:        string;
    images:       string[];
}
