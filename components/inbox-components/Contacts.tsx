"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Image from "next/image";
import { IUser } from "@/models/user-schema";
import { Button } from "../ui/button";
import axios from "axios";
import placeholder from "@/public/placeholder.png";
import { useRouter } from "next/navigation";

const Contacts = ({ currentUser }: { currentUser: IUser | null }) => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<IUser[]>([]);
  const [search, setSearch] = useState("");

  // Fetch contacts based on search
  useEffect(() => {
    const getContacts = async () => {
      try {
        const res = await axios.get(`/api/contacts?search=${search}`);
        const data = await res.data;
        setContacts(data.filter((contact: IUser) => contact._id !== currentUser?._id));
        setLoading(false);
      } catch (error) {
        console.error("FAILED TO GET CONTACTS", error);
      }
    };
    getContacts();
  }, [currentUser, search]);

  // Track selected contacts as a Set of IUser objects
  const [selectedContacts, setSelectedContacts] = useState<Set<IUser>>(new Set());

  // Handle checkbox selection
  const handleCheckboxChange = (user: IUser) => {
    setSelectedContacts((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(user)) {
        // If the user is already selected, remove them
        newSelected.delete(user);
      } else {
        // If the user is not selected, add them
        newSelected.add(user);
      }
      return newSelected;
    });
  };

  // Form state for group name
  const [groupName, setGroupName] = useState("");

  // Handle form submission
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Add the current user to the selected contacts
    if (currentUser) {
      selectedContacts.add(currentUser);
    }

    console.log("SELECTED CONTACTS", selectedContacts);

    // Convert selected contacts to an array of participant IDs
    const participantsIds = Array.from(selectedContacts).map((user) => String(user._id));
    console.log("PARTICIPANTS", participantsIds);

    const res = await fetch("/api/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        participants: participantsIds,
        isGroup: selectedContacts.size > 1,
        groupName: selectedContacts.size > 1 ? groupName : "",
        groupPhoto: "",
      }),
    });

    const newConversation = await res.json();
    console.log("NEW CONVERSATION", newConversation);

    if (res.ok) {
      router.push(`/inbox/${newConversation._id}`);
    }
  };

  return (
    <div className="create-chat-container">
      {/* Search Input */}
      <Input placeholder="Search user!" value={search} onChange={(e) => setSearch(e.target.value)} />

      {/* Contact List */}
      <div className="contact-bar">
        <div className="contact-list">
          <Label className="text-body-bold">Select Contacts</Label>
          {contacts.map((user, index) => (
            <div key={index} className="contact">
              <input
                type="checkbox"
                id={`contact-${user._id}`}
                value={String(user._id)}
                checked={Array.from(selectedContacts).some((contact) => contact._id === user._id)}
                onChange={() => handleCheckboxChange(user)}
              />
              <label htmlFor={`contact-${user._id}`} className="flex items-center gap-2">
                <Image
                  src={user?.profilePicture || placeholder}
                  alt="Profile Image"
                  height={40}
                  width={40}
                  className="profilePhoto rounded-full"
                />
                <p className="text-base-bold">
                  {user.firstName} {user.lastName}
                </p>
              </label>
            </div>
          ))}
        </div>

        {/* Conversation Creation Form */}
        <form onSubmit={handleSubmit} className="create-chat">
          {selectedContacts.size > 1 && (
            <>
              <div className="flex flex-col gap-3">
                <Label htmlFor="groupName" className="text-body-bold">
                  Group Name
                </Label>
                <Input
                  id="groupName"
                  placeholder="Group Name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label className="text-body-bold">Selected Members</Label>
                <div className="flex flex-wrap gap-2">
                  {Array.from(selectedContacts).map((user, index) => (
                    <span key={index} className="selected-contact">
                      {user.firstName} {user.lastName}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          <Button type="submit" disabled={selectedContacts.size === 0}>
            START A NEW CHAT
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contacts;
