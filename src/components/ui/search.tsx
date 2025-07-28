"use client"

import { useState } from "react"
import { Search, X, Clock, User, FileText, Calendar } from "lucide-react"
import { Input } from "./input"
import { Button } from "./button"
import { Badge } from "./badge"

interface SearchResult {
  id: string
  title: string
  description: string
  type: "user" | "document" | "schedule" | "task"
  url: string
  timestamp?: string
}

const mockResults: SearchResult[] = [
  {
    id: "1",
    title: "John Smith",
    description: "Engineering Manager • john.smith@aibos.com",
    type: "user",
    url: "/hr/users",
    timestamp: "Last active: 2 hours ago"
  },
  {
    id: "2",
    title: "Employee Handbook 2024",
    description: "Updated company policies and procedures",
    type: "document",
    url: "/documents/handbook",
    timestamp: "Updated: Jan 15, 2024"
  },
  {
    id: "3",
    title: "Conference Room A - Meeting",
    description: "Product Review Meeting • 2:00 PM - 3:30 PM",
    type: "schedule",
    url: "/ga/schedule",
    timestamp: "Today"
  },
  {
    id: "4",
    title: "Office Floor 2 Cleaning",
    description: "Daily maintenance task assigned to Mike Johnson",
    type: "task",
    url: "/ga/cleaning",
    timestamp: "Due: Today 3:00 PM"
  }
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case "user":
      return <User className="w-4 h-4" />
    case "document":
      return <FileText className="w-4 h-4" />
    case "schedule":
      return <Calendar className="w-4 h-4" />
    case "task":
      return <Clock className="w-4 h-4" />
    default:
      return <Search className="w-4 h-4" />
  }
}

const getTypeColor = (type: string) => {
  const colors: { [key: string]: string } = {
    "user": "bg-blue-100 text-blue-800",
    "document": "bg-green-100 text-green-800",
    "schedule": "bg-purple-100 text-purple-800",
    "task": "bg-yellow-100 text-yellow-800"
  }
  return colors[type] || "bg-gray-100 text-gray-800"
}

interface GlobalSearchProps {
  placeholder?: string
  className?: string
}

export function GlobalSearch({ placeholder = "Search across all portals...", className = "" }: GlobalSearchProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])

  const handleSearch = (value: string) => {
    setQuery(value)
    if (value.length > 2) {
      // Simulate search with mock results
      const filtered = mockResults.filter(
        result => 
          result.title.toLowerCase().includes(value.toLowerCase()) ||
          result.description.toLowerCase().includes(value.toLowerCase())
      )
      setResults(filtered)
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-10"
          onFocus={() => query.length > 2 && setIsOpen(true)}
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            onClick={clearSearch}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-gray-500 mb-2">
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </div>
            {results.map((result) => (
              <div
                key={result.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  // Navigate to result URL
                  window.location.href = result.url
                  setIsOpen(false)
                }}
              >
                <div className="flex-shrink-0 mt-1">
                  {getTypeIcon(result.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {result.title}
                    </h4>
                    <Badge className={getTypeColor(result.type)} variant="secondary">
                      {result.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {result.description}
                  </p>
                  {result.timestamp && (
                    <p className="text-xs text-gray-500 mt-1">
                      {result.timestamp}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isOpen && results.length === 0 && query.length > 2 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50">
          <div className="p-4 text-center text-gray-500">
            <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No results found for &quot;{query}&quot;</p>
            <p className="text-xs text-gray-400 mt-1">
              Try searching for users, documents, schedules, or tasks
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

