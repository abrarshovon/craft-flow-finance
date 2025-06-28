
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Plus, Search, Filter, Calendar } from 'lucide-react';

const expenses = [
  {
    id: 1,
    description: 'Adobe Creative Suite Monthly',
    amount: 52.99,
    category: 'Software',
    date: '2024-06-25',
    taxDeductible: true,
    receipt: true
  },
  {
    id: 2,
    description: 'Office Supplies - Staples',
    amount: 145.32,
    category: 'Office Supplies',
    date: '2024-06-24',
    taxDeductible: true,
    receipt: true
  },
  {
    id: 3,
    description: 'Internet Bill - Comcast',
    amount: 89.99,
    category: 'Utilities',
    date: '2024-06-23',
    taxDeductible: true,
    receipt: false
  },
  {
    id: 4,
    description: 'Business Lunch - Client Meeting',
    amount: 24.50,
    category: 'Business Meals',
    date: '2024-06-22',
    taxDeductible: true,
    receipt: true
  },
  {
    id: 5,
    description: 'MacBook Pro Repair',
    amount: 299.00,
    category: 'Equipment',
    date: '2024-06-21',
    taxDeductible: true,
    receipt: true
  },
  {
    id: 6,
    description: 'Parking Fee - Client Visit',
    amount: 15.00,
    category: 'Travel',
    date: '2024-06-20',
    taxDeductible: true,
    receipt: false
  }
];

const categories = [
  'Software',
  'Office Supplies',
  'Utilities',
  'Business Meals',
  'Equipment',
  'Travel',
  'Marketing',
  'Professional Services'
];

export default function ExpenseList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || expense.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const taxDeductibleTotal = filteredExpenses.filter(exp => exp.taxDeductible).reduce((sum, expense) => sum + expense.amount, 0);
  const thisMonthExpenses = filteredExpenses.filter(exp => exp.date.startsWith('2024-06')).reduce((sum, expense) => sum + expense.amount, 0);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Software: 'bg-purple-100 text-purple-800',
      'Office Supplies': 'bg-blue-100 text-blue-800',
      Utilities: 'bg-green-100 text-green-800',
      'Business Meals': 'bg-orange-100 text-orange-800',
      Equipment: 'bg-red-100 text-red-800',
      Travel: 'bg-indigo-100 text-indigo-800',
      Marketing: 'bg-pink-100 text-pink-800',
      'Professional Services': 'bg-teal-100 text-teal-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Expenses</h2>
            <p className="mt-1 text-gray-600">Track and categorize your business expenses</p>
          </div>
          <Button className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white shadow-md">
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-gray-900">${totalExpenses.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-full">
                <CreditCard className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tax Deductible</p>
                <p className="text-2xl font-bold text-green-600">${taxDeductibleTotal.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-blue-600">${thisMonthExpenses.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white shadow-sm mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Expense List */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            All Expenses ({filteredExpenses.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start sm:items-center space-x-4">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <CreditCard className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{expense.description}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getCategoryColor(expense.category)}>
                            {expense.category}
                          </Badge>
                          {expense.taxDeductible && (
                            <Badge variant="outline" className="text-green-700 border-green-200">
                              Tax Deductible
                            </Badge>
                          )}
                          {expense.receipt && (
                            <Badge variant="outline" className="text-blue-700 border-blue-200">
                              Receipt
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-0 flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {expense.date}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 text-right">
                  <p className="text-xl font-bold text-gray-900">${expense.amount.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          {filteredExpenses.length === 0 && (
            <div className="text-center py-12">
              <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
