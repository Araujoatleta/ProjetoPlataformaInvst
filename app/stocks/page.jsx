"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { apiService } from "@/lib/axios";

export default function REITAnalysis() {
  const [symbol, setSymbol] = useState("");
  const [reitsList, setReitsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // Função para carregar a lista de REITs (FII)
  const loadREITsList = async () => {
    try {
      setLoading(true);
      const reits = await apiService.getREITsList();
      setReitsList(reits);
    } catch (err) {
      setError("Failed to load REITs list");
    } finally {
      setLoading(false);
    }
  };

  const calculateREITMetrics = (data) => {
    const { dividendYield, priceToBookRatio: pbRatio } = data;

    let recommendation = "Neutral";
    if (dividendYield >= 0.06 && pbRatio <= 1.0) {
      recommendation = "Strong Buy";
    } else if (dividendYield >= 0.06 || pbRatio <= 1.0) {
      recommendation = "Buy";
    } else if (dividendYield < 0.04 && pbRatio > 1.2) {
      recommendation = "Sell";
    }

    return {
      dividendYield: (dividendYield * 100).toFixed(2),
      pbRatio: pbRatio.toFixed(2),
      recommendation,
    };
  };

  const analyzeREIT = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getREITData(symbol);
      const analysis = calculateREITMetrics(data);
      setResults(analysis);
    } catch (err) {
      setError("Failed to analyze REIT");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="flex gap-4">
          <Button onClick={loadREITsList} disabled={loading}>
            {loading ? "Loading..." : "Load REITs List"}
          </Button>
          <Select
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="flex-1"
          >
            <option value="">Select a REIT</option>
            {reitsList.map((reit) => (
              <option key={reit.symbol} value={reit.symbol}>
                {reit.symbol} - {reit.name}
              </option>
            ))}
          </Select>
          <Button onClick={analyzeREIT} disabled={loading || !symbol}>
            {loading ? "Analyzing..." : "Analyze REIT"}
          </Button>
        </div>

        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 col-span-2">
            <h3 className="font-bold text-xl">2-in-1 Method Analysis</h3>
            <div className="mt-4 grid gap-4">
              <div>
                <h4 className="font-semibold">Dividend Yield</h4>
                <p className="text-lg">{results.dividendYield}%</p>
              </div>
              <div>
                <h4 className="font-semibold">P/B Ratio</h4>
                <p className="text-lg">{results.pbRatio}</p>
              </div>
              <div>
                <h4 className="font-semibold">Recommendation</h4>
                <p
                  className={`text-lg font-bold ${
                    results.recommendation === "Strong Buy"
                      ? "text-green-600"
                      : results.recommendation === "Buy"
                      ? "text-green-500"
                      : results.recommendation === "Sell"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {results.recommendation}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </Card>
  );
}
