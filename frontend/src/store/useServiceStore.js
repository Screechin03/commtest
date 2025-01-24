import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useServiceStore = create((set) => ({
    services: [],
    service: null,
    loading: false,
    error: null,
    isAdmin: true,

    getServices: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axiosInstance.get("/services/all");
            set({ services: response.data, loading: false });
            toast.success("Services fetched successfully!");
        } catch (error) {
            set({ error: error.message, loading: false });
            toast.error(`Failed to fetch services: ${error.message}`);
        }
    },
    getServiceById: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await axiosInstance.get(`/services/${id}`);
            set({ service: response.data, loading: false });
            toast.success("Service fetched successfully!");
        } catch (error) {
            set({ error: error.message, loading: false });
            toast.error(`Failed to fetch service: ${error.message}`);
        }
    },
    deleteService: async (id) => {
        set({ loading: true, error: null });
        try {
            await axiosInstance.delete(`/services/${id}`);
            set((state) => ({
                services: state.services.filter((service) => service.id !== id),
                loading: false,
            }));
            toast.success("Service deleted successfully!");
        } catch (error) {
            set({ error: error.message, loading: false });
            toast.error(`Failed to delete service: ${error.message}`);
        }
    },

    updateService: async (id, updatedData) => {
        set({ loading: true, error: null });
        try {
            const response = await axiosInstance.put(`/services/${id}`, updatedData);
            set((state) => ({
                services: state.services.map((service) =>
                    service.id === id ? response.data : service
                ),
                loading: false,
            }));
            toast.success("Service updated successfully!");
        } catch (error) {
            set({ error: error.message, loading: false });
            toast.error(`Failed to update service: ${error.message}`);
        }
    },
    createService: async (newData) => {
        set({ loading: true, error: null });
        try {
            const response = await axiosInstance.post(`/services/create`, newData);
            set((state) => ({
                services: [...state.services, response.data],
                loading: false,
            }));
            toast.success("Service created successfully!");
        } catch (error) {
            set({ error: error.message, loading: false });
            toast.error(`Failed to create service: ${error.message}`);
        }
    },
    checkAdminStatus: (code) => {
        if (code === '12345') {
            set({ isAdmin: true });
        } else {
            set({ isAdmin: false });
        }
    },
}));
