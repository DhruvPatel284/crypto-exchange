"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bitcoin,  Coins } from "lucide-react"

export default function Home() {
  const router = useRouter()

  const cryptoCards = [
    { name: "Bitcoin", symbol: "BTC", icon: Bitcoin, color: "text-yellow-500" },
    { name: "Solana", symbol: "SOL", icon: Coins, color: "text-green-500" },
  ]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-900 text-white">
      <Card className="w-full max-w-4xl bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-blue-400">Crypto Trading Hub</CardTitle>
          <CardDescription className="text-center text-gray-400">
            Select a cryptocurrency to start trading
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cryptoCards.map((crypto) => (
              <Card
                key={crypto.symbol}
                className="bg-gray-700 border-gray-600 hover:border-blue-500 transition-colors duration-300"
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-center">
                    <crypto.icon className={`w-8 h-8 mr-2 ${crypto.color}`} />
                    {crypto.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => router.push(`/trade/${crypto.symbol}_USDC`)}
                  >
                    Trade {crypto.symbol}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}