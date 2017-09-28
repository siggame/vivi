import * as moment from "moment";

type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export interface IMeeting {
    day: Day;
    room: string;
    times: moment.Moment[];
}

export function formatMeeting({ day, room, times: [start, end] }: IMeeting): string {
    let formatted = `**Day**: ${day}` +
        `\n**Room**: ${room}` +
        `\n**Starts**: ${start}`;
    if (end) {
        formatted += `\n**Ends**: ${end}`;
    }
    return formatted;
}

const meetingDetails: [string, { day: Day, room: string, times: string[] }][] = [
    ["AI", {
        day: "Monday",
        room: "Toomey 251",
        times: ["6:00 PM", "7:00 PM"],
    }],
    ["Arena", {
        day: "Saturday",
        room: "CS 213",
        times: ["8:00 AM", "12:00 PM"],
    }],
    ["Game", {
        day: "Monday",
        room: "Toomey 251",
        times: ["6:00 PM", "7:00 PM"],
    }],
    ["General SIG-Game", {
        day: "Wednesday",
        room: "CS 207",
        times: ["5:00 PM"],
    }],
    ["Public Relations", {
        day: "Monday",
        room: "CS 213",
        times: ["6:00 PM", "7:00 PM"],
    }],
    ["Visualizer", {
        day: "Tuesday",
        room: "TBA",
        times: ["5:00 PM", "6:00 PM"],
    }],
    ["Web", {
        day: "Wednesday",
        room: "Refer to lead",
        times: ["6:00 PM", "7:00 PM"],
    }],
];

// convert start and end `times` from strings to moments
// a moment makes it easy to do match on dates and times
const meetings = new Map<string, IMeeting>(
    meetingDetails.map(([name, { day, room, times }]): [string, IMeeting] => {
        return [name, {
            day,
            room,
            times: times.map((time): moment.Moment => moment(time, ["h:mm A"]).day(day)),
        }];
    }),
);

export default meetings;
