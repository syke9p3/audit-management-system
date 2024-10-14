import { useState } from 'react'
import { BadgeCheck, Mail, Phone, PlusIcon, SearchIcon, UserPlus } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'

// Mock data for auditors
const mockAuditors = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", contactNumber: "+1 234 567 8901", specialization: "Financial", certifications: ["CPA", "CIA"], status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", contactNumber: "+1 234 567 8902", specialization: "IT", certifications: ["CISA", "CISSP"], status: "Active" },
    { id: 3, name: "Carol Williams", email: "carol@example.com", contactNumber: "+1 234 567 8903", specialization: "Compliance", certifications: ["CFE"], status: "On Leave" },
    { id: 4, name: "David Brown", email: "david@example.com", contactNumber: "+1 234 567 8904", specialization: "Operational", certifications: ["CIA", "CRMA"], status: "Active" },
    { id: 5, name: "Eva Martinez", email: "eva@example.com", contactNumber: "+1 234 567 8905", specialization: "Environmental", certifications: ["CSP"], status: "Inactive" },
]

interface Auditor {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    contactNumber: string,
    specialization: string,
    status: string,
}

interface AuditorsPageProps extends PageProps {
    auditors: Auditor[]
}

export default function AuditorsPage({ auth, auditors }: AuditorsPageProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterSpecialization, setFilterSpecialization] = useState("All")
    const [filterStatus, setFilterStatus] = useState("All")

    const filteredAuditors = mockAuditors
        .filter(auditor =>
            (auditor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                auditor.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (filterSpecialization === "All" || auditor.specialization === filterSpecialization) &&
            (filterStatus === "All" || auditor.status === filterStatus)
        )

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Auditors" />
            <Card className="w-full">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Auditors</CardTitle>
                        <Button>
                            <UserPlus className="mr-2 h-4 w-4" /> Add Auditor
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0 md:space-x-2">
                        <div className="relative w-full md:w-64">
                            <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search auditors..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex space-x-2">
                            <Select value={filterSpecialization} onValueChange={setFilterSpecialization}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter Specialization" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Specializations</SelectItem>
                                    <SelectItem value="Financial">Financial</SelectItem>
                                    <SelectItem value="IT">IT</SelectItem>
                                    <SelectItem value="Compliance">Compliance</SelectItem>
                                    <SelectItem value="Operational">Operational</SelectItem>
                                    <SelectItem value="Environmental">Environmental</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={filterStatus} onValueChange={setFilterStatus}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Filter Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Statuses</SelectItem>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="On Leave">On Leave</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Certifications</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Contact</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAuditors.map((auditor) => (
                                <TableRow key={auditor.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center space-x-2">
                                            <Avatar>
                                                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${auditor.name}`} alt={auditor.name} />
                                                <AvatarFallback>{auditor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <span>{auditor.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{auditor.specialization}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {auditor.certifications.map((cert, index) => (
                                                <Badge key={index} variant="secondary">
                                                    <BadgeCheck className="mr-1 h-3 w-3" />
                                                    {cert}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                auditor.status === "Active" ? "default" :
                                                    auditor.status === "On Leave" ? "secondary" : "outline"
                                            }
                                        >
                                            {auditor.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col space-y-1">
                                            <div className="flex items-center space-x-1">
                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm">{auditor.email}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Phone className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm">{auditor.contactNumber}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    )
}