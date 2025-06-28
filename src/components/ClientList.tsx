
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Search, Phone, FileText } from 'lucide-react';

const clients = [
  {
    id: 1,
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    phone: '+1 (555) 123-4567',
    totalInvoiced: 3200,
    outstandingAmount: 0,
    lastInvoice: '2024-06-25',
    status: 'active',
    projectCount: 3
  },
  {
    id: 2,
    name: 'Design Studio Pro',
    email: 'hello@designstudio.com',
    phone: '+1 (555) 234-5678',
    totalInvoiced: 1850,
    outstandingAmount: 850,
    lastInvoice: '2024-06-20',
    status: 'active',
    projectCount: 2
  },
  {
    id: 3,
    name: 'Tech Startup Inc',
    email: 'info@techstartup.com',
    phone: '+1 (555) 345-6789',
    totalInvoiced: 4200,
    outstandingAmount: 2100,
    lastInvoice: '2024-06-10',
    status: 'active',
    projectCount: 5
  },
  {
    id: 4,
    name: 'Marketing Agency LLC',
    email: 'team@marketingagency.com',
    phone: '+1 (555) 456-7890',
    totalInvoiced: 2150,
    outstandingAmount: 0,
    lastInvoice: '2024-06-12',
    status: 'active',
    projectCount: 4
  },
  {
    id: 5,
    name: 'E-commerce Solutions',
    email: 'support@ecommerce.com',
    phone: '+1 (555) 567-8901',
    totalInvoiced: 5500,
    outstandingAmount: 1750,
    lastInvoice: '2024-06-25',
    status: 'active',
    projectCount: 6
  },
  {
    id: 6,
    name: 'Creative Collective',
    email: 'hello@creative.com',
    phone: '+1 (555) 678-9012',
    totalInvoiced: 800,
    outstandingAmount: 0,
    lastInvoice: '2024-05-15',
    status: 'inactive',
    projectCount: 1
  }
];

export default function ClientList() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalClients = filteredClients.length;
  const activeClients = filteredClients.filter(client => client.status === 'active').length;
  const totalRevenue = filteredClients.reduce((sum, client) => sum + client.totalInvoiced, 0);
  const totalOutstanding = filteredClients.reduce((sum, client) => sum + client.outstandingAmount, 0);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Clients</h2>
            <p className="mt-1 text-gray-600">Manage your client relationships</p>
          </div>
          <Button className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white shadow-md">
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">{totalClients}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Clients</p>
                <p className="text-2xl font-bold text-green-600">{activeClients}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-purple-600">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-full">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Outstanding</p>
                <p className="text-2xl font-bold text-orange-600">${totalOutstanding.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-full">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="bg-white shadow-sm mb-6">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Client List */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            All Clients ({filteredClients.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="flex flex-col lg:flex-row lg:items-center justify-between p-6 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start lg:items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold">
                      {getInitials(client.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6">
                      <div className="mb-3 lg:mb-0">
                        <h3 className="font-semibold text-gray-900 text-lg">{client.name}</h3>
                        <p className="text-gray-600">{client.email}</p>
                        <div className="flex items-center mt-1 text-gray-500">
                          <Phone className="h-4 w-4 mr-1" />
                          <span className="text-sm">{client.phone}</span>
                        </div>
                      </div>
                      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-2 lg:space-y-0">
                        <div className="text-sm">
                          <p className="font-medium text-gray-700">Projects: {client.projectCount}</p>
                          <p className="text-gray-500">Last invoice: {client.lastInvoice}</p>
                        </div>
                        <Badge 
                          className={client.status === 'active' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }
                        >
                          {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 lg:mt-0 flex flex-col lg:items-end space-y-2">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Invoiced</p>
                    <p className="text-xl font-bold text-gray-900">${client.totalInvoiced.toLocaleString()}</p>
                  </div>
                  {client.outstandingAmount > 0 && (
                    <div className="text-right">
                      <p className="text-sm text-orange-600">Outstanding</p>
                      <p className="text-lg font-semibold text-orange-600">${client.outstandingAmount.toLocaleString()}</p>
                    </div>
                  )}
                  <div className="flex space-x-2 mt-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      <FileText className="h-4 w-4 mr-1" />
                      Create Invoice
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredClients.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
              <p className="text-gray-600">Try adjusting your search criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
