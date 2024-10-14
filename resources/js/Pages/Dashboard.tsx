import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, BookOpen, Calendar, ClipboardCheck, FileText, GraduationCap, PieChart, Users } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />
            <h1 className='text-2xl font-bold py-3 px-1'>Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium ">Total Audits</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[#055F92]">248</div>
                        <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Open Findings</CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[#05B173]">42</div>
                        <p className="text-xs text-muted-foreground">-8% from last week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Upcoming Audits</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[#D31C1C]">7</div>
                        <p className="text-xs text-muted-foreground">Next 30 days</p>
                    </CardContent>
                </Card>
                {/* <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
                        <PieChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">92%</div>
                        <p className="text-xs text-muted-foreground">+3% from last quarter</p>
                    </CardContent>
                </Card> */}
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Audit Activities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { icon: FileText, text: "IT Security Audit completed for Q3" },
                                { icon: AlertCircle, text: "New high-risk finding identified in Finance dept" },
                                { icon: Users, text: "External auditor access granted for annual review" },
                                { icon: ClipboardCheck, text: "Compliance checklist updated for ISO 27001" },
                            ].map((item, index) => (
                                <div key={index} className="flex items-center">
                                    <item.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Upcoming Audits</CardTitle>
                        <CardDescription>Next 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { name: "Financial Controls Review", date: "2023-10-15", type: "Internal" },
                                { name: "GDPR Compliance Audit", date: "2023-10-22", type: "External" },
                                { name: "Supply Chain Security", date: "2023-10-28", type: "Internal" },
                                { name: "Cloud Infrastructure Audit", date: "2023-11-05", type: "Internal" },
                            ].map((audit, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium">{audit.name}</p>
                                        <p className="text-sm text-muted-foreground">{audit.date}</p>
                                    </div>
                                    <Badge variant={audit.type === "Internal" ? "secondary" : "outline"}>{audit.type}</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Recent Audit Findings</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Finding</TableHead>
                                <TableHead>Severity</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Due Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[
                                { finding: "Outdated software versions", severity: "High", department: "IT", status: "Open", dueDate: "2023-10-30" },
                                { finding: "Incomplete asset inventory", severity: "Medium", department: "Operations", status: "In Progress", dueDate: "2023-11-15" },
                                { finding: "Insufficient access controls", severity: "High", department: "HR", status: "Open", dueDate: "2023-10-25" },
                                { finding: "Missing security patches", severity: "Critical", department: "IT", status: "In Progress", dueDate: "2023-10-20" },
                                { finding: "Inadequate backup procedures", severity: "Medium", department: "Finance", status: "Open", dueDate: "2023-11-05" },
                            ].map((finding, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{finding.finding}</TableCell>
                                    <TableCell>
                                        <Badge variant={finding.severity === "High" || finding.severity === "Critical" ? "destructive" : "secondary"}>
                                            {finding.severity}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{finding.department}</TableCell>
                                    <TableCell>{finding.status}</TableCell>
                                    <TableCell>{finding.dueDate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
