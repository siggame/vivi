export interface IMeeting {
    day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
    room: string;
    startTime: string;
    endTime?: string;
}

export function formatMeeting(meeting: IMeeting): string {
    let formatted = `**Day**: ${meeting.day}` +
        `\n**Room**: ${meeting.room}` +
        `\n**Starts**: ${meeting.startTime}`;
    if (meeting.endTime) {
        formatted += `\n**Ends**: ${meeting.endTime}`;
    }
    return formatted;
}

const meetings = new Map<string, IMeeting>([
    ["Arena", {
        day: "Saturday",
        endTime: "NOON",
        room: "CS 213",
        startTime: "8AM",
    }],
    ["Game/AI", {
        day: "Monday",
        endTime: "7PM",
        room: "Toomey 251",
        startTime: "6PM",
    }],
    ["General SIG-Game", {
        day: "Wednesday",
        room: "CS 207",
        startTime: "5PM",
    }],
    ["Public Relations", {
        day: "Monday",
        endTime: "7PM",
        room: "CS 213",
        startTime: "6PM",
    }],
    ["Visualizer", {
        day: "Tuesday",
        endTime: "6PM",
        room: "TBA",
        startTime: "5PM",
    }],
    ["Web", {
        day: "Wednesday",
        endTime: "7PM",
        room: "Refer to lead",
        startTime: "6PM",
    }],
]);

export default meetings;
