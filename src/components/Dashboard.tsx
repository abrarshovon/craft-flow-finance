
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, CreditCard, Users, DollarSign, Plus, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalInvoices: 0,
    totalRevenue: 0,
    totalExpenses: 0,
    totalClients: 0,
    pendingInvoices: 0,
    overdueInvoices: 0
  });

  useEffect(() => {
    calculateStats();
  }, []);

  const calculateStats = () => {
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');

    const totalRevenue = invoices.reduce((sum, invoice) => sum + (invoice.total || 0), 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
    const pendingInvoices = invoices.filter(inv => inv.status === 'pending').length;
    const overdueInvoices = invoices.filter(inv => inv.status === 'overdue').length;

    setStats({
      totalInvoices: invoices.length,
      totalRevenue,
      totalExpenses,
      totalClients: clients.length,
      pendingInvoices,
      overdueInvoices
    });
  };

  const netIncome = stats.totalRevenue - stats.totalExpenses;

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name || 'Freelancer'}! 👋
        </h1>
        <p className="mt-2 text-gray-600">
          Here's an overview of your freelance business
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Link to="/invoices">
          <Button className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </Link>
        <Link to="/expenses">
          <Button className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </Link>
        <Link to="/clients">
          <Button className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white shadow-sm border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Income</p>
                <p className={`text-2xl font-bold ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${netIncome.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalExpenses.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-full">
                <CreditCard className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Clients</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalClients}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
              Attention Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.overdueInvoices > 0 && (
                <div className="flex items-center p-3 bg-red-50 rounded-lg">
                  <div className="p-2 bg-red-100 rounded-full mr-3">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-red-800">Overdue Invoices</p>
                    <p className="text-sm text-red-600">{stats.overdueInvoices} invoice(s) are overdue</p>
                  </div>
                </div>
              )}
              
              {stats.pendingInvoices > 0 && (
                <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                  <div className="p-2 bg-yellow-100 rounded-full mr-3">
                    <Clock className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-yellow-800">Pending Payments</p>
                    <p className="text-sm text-yellow-600">{stats.pendingInvoices} invoice(s) awaiting payment</p>
                  </div>
                </div>
              )}

              {stats.overdueInvoices === 0 && stats.pendingInvoices === 0 && (
                <div className="text-center py-8">
                  <div className="p-3 bg-green-50 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-green-800 font-medium">All caught up!</p>
                  <p className="text-sm text-green-600">No immediate actions required</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Business Overview */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Business Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">Total Invoices</span>
                </div>
                <span className="font-semibold text-gray-900">{stats.totalInvoices}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-red-600 mr-3" />
                  <span className="text-gray-700">Expense Entries</span>
                </div>
                <span className="font-semibold text-gray-900">{JSON.parse(localStorage.getItem('expenses') || '[]').length}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="text-gray-700">Client Relationships</span>
                </div>
                <span className="font-semibold text-gray-900">{stats.totalClients}</span>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Profit Margin</span>
                  <span className={`font-bold ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stats.totalRevenue > 0 ? Math.round((netIncome / stats.totalRevenue) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
