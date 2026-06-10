'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    Sidebar, SidebarContent, SidebarHeader,
    SidebarMenu, SidebarMenuItem, SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Search, BarChart2, Trophy, GraduationCap } from 'lucide-react';

const navItems = [
    { href: '/', label: 'Tra cứu điểm', icon: Search },
    { href: '/statistics', label: 'Thống kê môn học', icon: BarChart2 },
    { href: '/top10', label: 'Top 10 Khối A', icon: Trophy },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarHeader className="px-4 py-5 border-b">
                <div className="flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-primary" />
                    <div className="leading-tight">
                        <div className="font-semibold text-sm">Tra Cứu Điểm</div>
                        <div className="text-xs text-muted-foreground">THPT Quốc Gia</div>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent className="pt-2">
                <SidebarMenu>
                    {navItems.map(({ href, label, icon: Icon }) => (
                        <SidebarMenuItem key={href}>
                            <SidebarMenuButton asChild isActive={pathname === href}>
                                <Link href={href}>
                                    <Icon className="w-4 h-4" />
                                    <span>{label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}