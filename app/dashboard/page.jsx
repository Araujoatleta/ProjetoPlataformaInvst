import React from 'react';
import { Card } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import StockAnalysis from './../stocks/page';
import REITAnalysis from './../reits/page';

export default function Dashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Investment Analysis Dashboard</h1>
      
      <Tabs defaultValue="stocks">
        <TabsList>
          <TabsTrigger value="stocks">Stock Analysis</TabsTrigger>
          <TabsTrigger value="reits">REIT Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stocks">
          <StockAnalysis />
        </TabsContent>
        
        <TabsContent value="reits">
          <REITAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
}