import { useState } from 'react'
import { CalendarIcon, ChevronDownIcon, FilterIcon, PlusIcon, SearchIcon, SortAscIcon } from 'lucide-react'
import { format } from 'date-fns'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'

// Mock data for audits
const audits = [
    { id: 1, name: "Financial Audit Q3 2023", type: "health_declaration_form.pdf", status: "In Progress", dueDate: "2023-10-15" },
    { id: 2, name: "IT Security Assessment", type: "finance_Q1_2024.pdf", status: "Planned", dueDate: "2023-11-01" },
    { id: 3, name: "Compliance Review", type: "security_report_Q1_2024.pdf", status: "Completed", dueDate: "2023-09-30" },
    { id: 4, name: "Operational Audit", type: "Internal", status: "In Progress", dueDate: "2023-10-22" },
    { id: 5, name: "Vendor Management Audit", type: "External", status: "Planned", dueDate: "2023-11-15" },
]

export default function AuditsPage({ auth }: PageProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterType, setFilterType] = useState("All")
    const [filterStatus, setFilterStatus] = useState("All")
    const [sortBy, setSortBy] = useState("dueDate")
    const [sortOrder, setSortOrder] = useState("asc")
    const [dateRange, setDateRange] = useState({ from: undefined, to: undefined })

    const filteredAudits = audits
        .filter(audit =>
            audit.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterType === "All" || audit.type === filterType) &&
            (filterStatus === "All" || audit.status === filterStatus)
        )
        .sort((a, b) => {
            if (sortBy === "dueDate") {
                return sortOrder === "asc"
                    ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
                    : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
            } else {
                return sortOrder === "asc"
                    ? a[sortBy].localeCompare(b[sortBy])
                    : b[sortBy].localeCompare(a[sortBy])
            }
        })

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Audits"></Head>
            <Card className="w-full">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Audits</CardTitle>
                        <Button>
                            <PlusIcon className="mr-2 h-4 w-4" /> New Audit
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
                        <div className="relative w-full md:w-64">
                            <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search audits..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex space-x-2">
                            <Select value={filterType} onValueChange={setFilterType}>
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Filter Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Compliance</SelectItem>
                                    <SelectItem value="Compliant">Compliant</SelectItem>
                                    <SelectItem value="Non-compliant">Non-compliant</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={filterStatus} onValueChange={setFilterStatus}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Filter Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Statuses</SelectItem>
                                    <SelectItem value="Planned">Planned</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-[190px] justify-start text-left font-normal">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dateRange.from ? (
                                            dateRange.to ? (
                                                <>
                                                    {format(dateRange.from, "LLL dd, y")} -{" "}
                                                    {format(dateRange.to, "LLL dd, y")}
                                                </>
                                            ) : (
                                                format(dateRange.from, "LLL dd, y")
                                            )
                                        ) : (
                                            <span>Pick a date range</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="range"
                                        selected={dateRange}
                                        onSelect={setDateRange}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Document</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="cursor-pointer" onClick={() => {
                                    setSortBy("dueDate")
                                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                                }}>
                                    Due Date
                                    <SortAscIcon className="ml-2 h-4 w-4 inline" />
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAudits.map((audit) => (
                                <TableRow key={audit.id}>
                                    <TableCell className="font-medium">{audit.name}</TableCell>
                                    <TableCell>
                                        <Badge variant={audit.type === "Internal" ? "secondary" : "outline"}>
                                            {audit.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                audit.status === "Completed" ? "default" :
                                                    audit.status === "In Progress" ? "secondary" : "outline"
                                            }

                                            className={'' +
                                                (audit.status === "Completed" ? "bg-teal-500" :
                                                    audit.status === "In Progress" ? "secondary" : "")
                                            }
                                        >
                                            {audit.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{audit.dueDate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    )
}