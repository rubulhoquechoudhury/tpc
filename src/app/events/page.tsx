"use client"

import * as React from "react"
import { Briefcase, Calendar, Clock, MapPin } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import PageHeader from "@/components/page-header"

type Event = {
  title: string
  type: "Workshop" | "Placement Drive" | "Seminar"
  date: string
  time: string
  location: string
  description: string
}

const events: Event[] = [
  {
    title: "Advanced React Workshop",
    type: "Workshop",
    date: "2024-08-15",
    time: "10:00 AM - 4:00 PM",
    location: "Auditorium A",
    description:
      "Deep dive into React hooks, state management with Redux, and performance optimization.",
  },
  {
    title: "TechCorp Placement Drive",
    type: "Placement Drive",
    date: "2024-08-20",
    time: "9:00 AM onwards",
    location: "Main Hall",
    description:
      "Recruitment drive for Software Engineer and Data Analyst roles. Bring your resumes!",
  },
  {
    title: "AI in Modern Business Seminar",
    type: "Seminar",
    date: "2024-08-25",
    time: "2:00 PM - 4:00 PM",
    location: "Virtual (Online)",
    description:
      "An insightful seminar by industry experts on the impact of AI across various sectors.",
  },
  {
    title: "Resume Building Workshop",
    type: "Workshop",
    date: "2024-09-02",
    time: "11:00 AM - 1:00 PM",
    location: "Room 301, CS Block",
    description:
      "Learn how to create a compelling resume that stands out to recruiters.",
  },
]

export default function EventsPage() {
  const [eventTypeFilter, setEventTypeFilter] = React.useState("all")

  const filteredEvents = events.filter((event) => {
    if (eventTypeFilter === "all") return true
    return event.type.toLowerCase().replace(" ", "-") === eventTypeFilter
  })

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <PageHeader
        title="Upcoming Events"
        description="Register for workshops, seminars, and placement drives."
      />
      <div className="flex items-center">
        <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="workshop">Workshop</SelectItem>
            <SelectItem value="placement-drive">Placement Drive</SelectItem>
            <SelectItem value="seminar">Seminar</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  )
}

function EventCard({ event }: { event: Event }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-headline text-xl">{event.title}</CardTitle>
          <Badge
            variant={
              event.type === "Placement Drive" ? "default" : "secondary"
            }
            className={
              event.type === "Placement Drive" ? "bg-primary" : ""
            }
          >
            {event.type}
          </Badge>
        </div>
        <CardDescription className="text-sm">
          {event.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-2 h-4 w-4" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-2 h-4 w-4" />
          <span>{event.location}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          style={{ backgroundColor: "hsl(var(--accent))", color: 'hsl(var(--accent-foreground))' }}
        >
          <Briefcase className="mr-2 h-4 w-4" />
          Register Now
        </Button>
      </CardFooter>
    </Card>
  )
}
