"use client"

import * as React from "react"
import Image from "next/image"
import { Check, Info, Search, X } from "lucide-react"

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
import { Input } from "@/components/ui/input"
import PageHeader from "@/components/page-header"

type Company = {
  name: string
  industry: string
  description: string
  hiringStatus: "Active" | "Paused" | "Pending Approval"
  needs: string[]
  logoUrl: string
}

const companies: Company[] = [
  {
    name: "TechCorp",
    industry: "Technology",
    description:
      "A leading innovator in cloud computing and AI solutions, transforming businesses worldwide.",
    hiringStatus: "Active",
    needs: ["Software Engineer", "Data Scientist", "Cloud Architect"],
    logoUrl: "https://placehold.co/100x100.png",
  },
  {
    name: "Innovate LLC",
    industry: "Fintech",
    description:
      "Developing next-generation financial tools for personal and business use.",
    hiringStatus: "Pending Approval",
    needs: ["Backend Developer", "Financial Analyst"],
    logoUrl: "https://placehold.co/100x100.png",
  },
  {
    name: "HealthWell",
    industry: "Healthcare",
    description: "Dedicated to improving patient outcomes through technology.",
    hiringStatus: "Active",
    needs: ["Medical App Developer", "UX/UI Designer"],
    logoUrl: "https://placehold.co/100x100.png",
  },
  {
    name: "BuildIt",
    industry: "Construction",
    description: "Building the future of sustainable infrastructure.",
    hiringStatus: "Paused",
    needs: ["Civil Engineer", "Project Manager"],
    logoUrl: "https://placehold.co/100x100.png",
  },
]

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <PageHeader
        title="Registered Companies"
        description="Vet new company profiles and browse partners."
      />
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search companies or industries..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCompanies.map((company) => (
          <CompanyCard key={company.name} company={company} />
        ))}
      </div>
    </div>
  )
}

function CompanyCard({ company }: { company: Company }) {
  const getStatusBadge = () => {
    switch (company.hiringStatus) {
      case "Active":
        return <Badge className="bg-green-600 text-white">Active</Badge>
      case "Paused":
        return <Badge variant="secondary">Paused</Badge>
      case "Pending Approval":
        return (
          <Badge variant="destructive" className="bg-amber-500 text-white">
            Pending
          </Badge>
        )
    }
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <Image
          src={company.logoUrl}
          alt={`${company.name} logo`}
          width={60}
          height={60}
          className="rounded-lg border"
          data-ai-hint="logo building"
        />
        <div className="flex-1">
          <div className="flex justify-between">
            <CardTitle className="font-headline text-xl">{company.name}</CardTitle>
            {getStatusBadge()}
          </div>
          <CardDescription>{company.industry}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        <p className="mb-4 text-sm text-muted-foreground">
          {company.description}
        </p>
        <div>
          <h4 className="mb-2 text-sm font-semibold">Recruiting Needs:</h4>
          <div className="flex flex-wrap gap-2">
            {company.needs.map((need) => (
              <Badge key={need} variant="outline">
                {need}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        {company.hiringStatus === "Pending Approval" ? (
          <div className="flex w-full gap-2">
            <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
              <Check className="mr-2 h-4 w-4" /> Approve
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="w-full"
            >
              <X className="mr-2 h-4 w-4" /> Reject
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" className="w-full">
            <Info className="mr-2 h-4 w-4" /> View Details
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
