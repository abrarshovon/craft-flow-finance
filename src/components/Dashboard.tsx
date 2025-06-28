
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, CreditCard, Users, Calendar, Plus, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';

const statsData = [
  {
    title: 'Total Income',
    value: '$12,450',
    change: '+8.2%',
    changeType: 'positive' as const,
    icon: ArrowUpRight,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Total Expenses',
    value: '$3,280',
    change: '+2.1%',
    changeType: 'negative' as const,
    icon: ArrowDownRight,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    title: 'Outstanding',
    value: '$2,150',
    change: '-12.5%',
    changeType: 'positive' as const,
    icon: Clock,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    title: 'Active Clients',
    value: '8',
    change: '+1',
    changeType: 'positive' as const,
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
];

const recentInvoices = [
  { id: 'INV-001', client: 'Acme Corp', amount: '$1,200', status: 'paid', date: '2024-06-25' },
  { id: 'INV-002', client: 'Design Studio', amount: '$850', status: 'pending', date: '2024-06-24' },
  { id: 'INV-003', client: 'Tech Startup', amount: '$2,100', status: 'overdue', date: '2024-06-20' },
  { id: 'INV-004', client: 'Marketing Agency', amount: '$950', status: 'paid', date: '2024-06-22' },
];

const recentExpenses = [
  { id: 1, description: 'Adobe Creative Suite', amount: '$52.99', category: 'Software', date: '2024-06-25' },
  { id: 2, description: 'Office Supplies', amount: '$145.32', category: 'Office', date: '2024-06-24' },
  { id: 3, description: 'Internet Bill', amount: '$89.99', category: 'Utilities', date: '2024-06-23' },
  { id: 4, description: 'Coffee Meeting', amount: '$24.50', category: 'Business Meals', date: '2024-06-22' },
];

export default function Dashboard() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="mt-1 text-gray-600">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <Icon className={`h-4 w-4 ${stat.color} mr-1`} />
                      <span className={`text-sm font-medium ${stat.color}`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">from last month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white shadow-md">
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
          <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
            <CreditCard className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
          <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
            <Users className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Invoices */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">Recent Invoices</CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                View all
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{invoice.id}</p>
                      <p className="text-sm text-gray-600">{invoice.client}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{invoice.amount}</p>
                    <Badge 
                      variant={invoice.status === 'paid' ? 'default' : invoice.status === 'overdue' ? 'destructive' : 'secondary'}
                      className="mt-1"
                    >
                      {invoice.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Expenses */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-900">Recent Expenses</CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                View all
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentExpenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <CreditCard className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{expense.description}</p>
                      <p className="text-sm text-gray-600">{expense.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{expense.amount}</p>
                    <p className="text-sm text-gray-600">{expense.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
